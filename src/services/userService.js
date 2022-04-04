const bcrypt = require('bcrypt');
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
        throw `Пользователь с почтовым адресом ${email} уже существует`;
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();

    const newUser = await Users.create({
        email, login, password: hashPassword, activationLink,
    });
    await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

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
        throw 'Неккоректная ссылка активации';
    }
    user.isActivated = true;
    await user.save();
}

async function login(email, password) {
    const findUser = await Users.findOne({ where: { email } });
    if (!findUser) {
        throw 'Пользователь с таким email не найден';
    }
    const isPassEquals = await bcrypt.compare(password, findUser.password);
    if (!isPassEquals) {
        throw 'Неверный пароль';
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
        throw 'ApiError.UnauthorizedError()';
    }
    const userData = validateRefreshToken(refreshToken);
    const tokenFromDb = await findToken(refreshToken);
    if (!userData || !tokenFromDb) {
        throw 'ApiError.UnauthorizedError()';
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

module.exports = {
    registration,
    activate,
    login,
    logout,
    refresh,
};
