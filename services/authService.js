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
} = require('../helpers/errors/customError');

const {
    generateTokens,
    saveToken,
    findToken,
    removeToken,
    validateRefreshToken,
} = require('./tokenService');

async function findUserById(id) {
    const findById = await Users.findByPk(id);
    return findById;
}

async function registration(login, email, password) {
    const findByEmail = await Users.findOne({ where: { email } });
    if (findByEmail) {
        throw new AlreadyExistsError('email');
    }
    const findByLogin = await Users.findOne({ where: { login } });
    if (findByLogin) {
        throw new AlreadyExistsError('login');
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();

    const newUser = await Users.create({
        email,
        login,
        password: hashPassword,
        activationLink,
    });
    await mailService.sendActivationMail(email, `${process.env.API_URL}/auth/activate/${activationLink}`);

    const user = {
        id: newUser.id,
        login: newUser.login,
        email: newUser.email,
        isActivated: newUser.isActivated,
    };
    const tokens = generateTokens(user);
    await saveToken(user.id, tokens.refreshToken);

    return { ...tokens, user };
}

async function activate(activationLink) {
    const findUser = await Users.findOne({ where: { activationLink } });
    if (!findUser) {
        throw new BadActivationLinkError();
    }
    await Users.update({
        isActivated: true,
        activationLink: null,
    }, { where: { email: findUser.email } });
    await findUser.save();
}

async function login(email, password) {
    
    const findUser = await Users.findOne({ where: { email } });
    if (!findUser) {
        throw new NotExistsError('user (by email)');
    }
    const isPassEquals = await bcrypt.compare(password, findUser.password);
    if (!isPassEquals) {
        throw new WrongPasswordError();
    }
    const user = {
        id: findUser.id,
        login: findUser.login,
        email: findUser.email,
        isActivated: findUser.isActivated,
        isGranted: findUser.isGranted,
    };
    const tokens = generateTokens(user);
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
    const findUser = await Users.findByPk(userData.id);
    const user = {
        id: findUser.id,
        login: findUser.login,
        email: findUser.email,
        isActivated: findUser.isActivated,
        isGranted: findUser.isGranted,
    };
    const tokens = generateTokens(user);

    await saveToken(user.id, tokens.refreshToken);
    return { ...tokens, user };
}

async function sendResetPassword(email) {
    const findUser = await Users.findOne({ where: { email } });
    if (!findUser) {
        throw new NotExistsError('user (by email)');
    }
    const link = uuid.v4();
    const password = generator.generate({
        length: 10,
        numbers: true,
    });
    const temporaryPassword = await bcrypt.hash(password, 3);
    await Users.update({
        resetPasswordLink: link,
        temporaryPassword,
    }, { where: { email } });
    await mailService.sendResetPasswordEmail(email, `${process.env.API_URL}/reset-password/${findUser.login}/${link}`, password);
}

async function changePassword(login, newPassword) {
    const findUser = await Users.findOne({ where: { login } });
    if (!findUser) {
        throw new NotExistsError('user (by login)');
    }
    const hashPassword = await bcrypt.hash(newPassword, 3);
    findUser.password = hashPassword;
    await findUser.save();
    return true;
}

async function resetConfirm(login, resetPasswordLink) {
    const findUser = await Users.findOne({ where: { login } });
    if (!findUser) {
        throw new NotExistsError('user (by login)');
    }
    if (resetPasswordLink !== findUser.resetPasswordLink) {
        throw new BadResetPasswordLinkError();
    }
    await Users.update({
        password: findUser.temporaryPassword,
        temporaryPassword: null,
        resetPasswordLink: null,
    }, { where: { login } });
    await mailService.sendConfirmResetPasswordEmail(findUser.email);
    return true;
}

module.exports = {
    registration,
    activate,
    login,
    logout,
    refresh,
    changePassword,
    sendResetPassword,
    resetConfirm,
    findUserById,
}
