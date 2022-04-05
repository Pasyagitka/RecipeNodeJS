const bcrypt = require('bcrypt');
const { password } = require('pg/lib/defaults');
const uuid = require('uuid');
const Users = require('../models').users;
const mailService = require('./mailService');
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
        throw new Error(`Пользователь с почтовым адресом ${email} уже существует`);
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
        throw new Error('Некорректная ссылка активации');
    }
    user.isActivated = true;
    await user.save();
}

async function login(email, password) {
    const findUser = await Users.findOne({ where: { email } });
    if (!findUser) {
        throw new Error('Пользователь с таким email не найден');
    }
    const isPassEquals = await bcrypt.compare(password, findUser.password);
    if (!isPassEquals) {
        throw new Error('Неверный пароль');
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
        throw new Error('Unauthorized');
    }
    const userData = validateRefreshToken(refreshToken);
    const tokenFromDb = await findToken(refreshToken);
    if (!userData || !tokenFromDb) {
        throw new Error('Unauthorized');
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
        throw new Error('Пользователь с таким email не найден');
    }
    const link = uuid.v4();
    await Users.update({resetPasswordLink: link}, { where: { email } });

    await mailService.sendResetPasswordEmail(email, `${process.env.API_URL}/auth/reset-password-email/${findUser.id}/${link}`, password);
}


async function reset(email, resetPasswordLink) {
    const user = await Users.findOne({ where: { email } });
    console.log(user);
    if (!user) {
        throw new Error('Пользователь не найден');
    }
    if (resetPasswordLink !== user.resetPasswordLink) {
        throw new Error('Неккоректная ссылка смены пароля');
    }
    return true;
}

async function resetPost(email, resetPasswordLink, password) {
    const user = await Users.findOne({ where: { email } });
    console.log(user);
    if (!user) {
        throw new Error('Пользователь не найден');
    }
    if (resetPasswordLink !== user.resetPasswordLink) {
        throw new Error('Неккоректная ссылка смены пароля');
    }
    const hashPassword = await bcrypt.hash(password, 3);
    await Users.update({password: hashPassword}, { where: { email } });
    return;
}

module.exports = {
    registration,
    activate,
    login,
    logout,
    refresh,
    sendResetPassword,
    reset,
    resetPost,
};
