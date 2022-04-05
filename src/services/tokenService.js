const jwt = require('jsonwebtoken');
const tokenModel = require('../models').token;

function generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '1d' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
    return {
        accessToken,
        refreshToken,
    };
}

function validateAccessToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (e) {
        return null;
    }
}

function validateRefreshToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (e) {
        return null;
    }
}

async function saveToken(userId, refreshToken) {
    const tokenData = await tokenModel.findOne({ userId });
    if (tokenData) {
        tokenData.refreshToken = refreshToken;
        return tokenData.save();
    }
    return await tokenModel.create({ userId, refreshToken });
}

async function removeToken(refreshToken) {
    return await tokenModel.deleteOne({ refreshToken });
}

async function findToken(refreshToken) {
    return await tokenModel.findOne({ refreshToken });
}

module.exports = {
    generateTokens,
    validateAccessToken,
    validateRefreshToken,
    saveToken,
    removeToken,
    findToken,
};
