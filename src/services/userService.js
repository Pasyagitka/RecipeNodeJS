const bcrypt = require('bcrypt');
const uuid = require('uuid');
const generator = require('generate-password');
const Users = require('../models').users;
const mailService = require('./mailService');
const {
    AlreadyExistsError,
    NotExistsError,
    UnauthorizedError,
    BadActivationLinkError,
    WrongPasswordError,
    BadResetPasswordLinkError,
} = require('../errors/customError');

const {
    generateTokens,
    saveToken,
    findToken,
    removeToken,
    validateRefreshToken,
} = require('./tokenService');

async function registration(login, email, password) {
    const candidate = await Users.findOne({ where: { email } });
    if (candidate) {
        throw new AlreadyExistsError();
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();

    const newUser = await Users.create({
        email, login, password: hashPassword, activationLink,
    });
    await mailService.sendActivationMail(email, `${process.env.API_URL}/auth/activate/${activationLink}`);

    const user = {
        id: newUser.id,
        email: newUser.email,
        isActivated: newUser.isActivated,
    };
    const tokens = generateTokens({ ...user });
    await saveToken(user.id, tokens.refreshToken);

    return { ...tokens, user };
}

async function activate(activationLink) {
    const user = await Users.findOne({ where: { activationLink } });
    if (!user) {
        throw new BadActivationLinkError();
    }
    await Users.update({isActivated: true, activationLink: null}, { where: { email: user.email } });
    await user.save();
}

async function login(email, password) {
    const findUser = await Users.findOne({ where: { email } });
    if (!findUser) {
        throw new NotExistsError();
    }
    const isPassEquals = await bcrypt.compare(password, findUser.password);
    if (!isPassEquals) {
        throw new WrongPasswordError();
    }
    const user = {
        id: findUser.id,
        email: findUser.email,
        isActivated: findUser.isActivated,
    };
    const tokens = generateTokens({ ...user });
    await saveToken(user.id, tokens.refreshToken);
    return { ...tokens, user };
}

async function logout(refreshToken) {
    const token = await removeToken(refreshToken);
    return token;
}

async function refresh(refreshToken) {
    if (!refreshToken) {
        throw new UnauthorizedError();
    }
    const userData = validateRefreshToken(refreshToken);
    const tokenFromDb = await findToken(refreshToken);
    if (!userData || !tokenFromDb) {
        throw new UnauthorizedError();
    }
    const user = await Users.findByPk(userData.id);
    const userDto = {
        id: user.id,
        email: user.email,
        isActivated: user.isActivated,
    };
    const tokens = generateTokens({ ...userDto });

    await saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
}


async function sendResetPassword(email) {
    const findUser = await Users.findOne({ where: { email } });
    if (!findUser) {
        throw new NotExistsError();
    }
    const link = uuid.v4();
    let password = generator.generate({
        length: 10,
        numbers: true
    });
    let temporaryPassword = await bcrypt.hash(password, 3);
    await Users.update({resetPasswordLink: link, temporaryPassword}, { where: { email } });
    await mailService.sendResetPasswordEmail(email, `${process.env.API_URL}/auth/reset-password/${findUser.login}/${link}`, password);
}


async function resetConfirm(login, resetPasswordLink) {
    const user = await Users.findOne({ where: { login } });
    if (!user) {
        throw new NotExistsError();
    }
    if (resetPasswordLink !== user.resetPasswordLink) {
        throw new BadResetPasswordLinkError();
    }
    await Users.update({password: user.temporaryPassword, temporaryPassword: null, resetPasswordLink: null}, { where: { login } });
    await mailService.sendConfirmResetPasswordEmail(user.email);
    return true;
}

module.exports = {
    registration,
    activate,
    login,
    logout,
    refresh,
    sendResetPassword,
    resetConfirm,
};
