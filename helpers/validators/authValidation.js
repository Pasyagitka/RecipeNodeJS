const { Joi } = require('express-validation');

const register = {
    body: Joi.object({
        login: Joi.string().required().min(3).max(15),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(6).max(15),
    }),
};

const login = {
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),
};

const sendReset = {
    body: Joi.object({
        email: Joi.string().email().required(),
    }),
};

const activate = {
    params: Joi.object({
        link: Joi.string().required(),
    }),
};

const changePassword = {
    body: Joi.object({
        newPassword: Joi.string().required(),
    }),
};

const resetConfirm = {
    params: Joi.object({
        login: Joi.string().required(),
        link: Joi.string().required(),
    }),
};

module.exports = {
    register,
    login,
    activate,
    sendReset,
    changePassword,
    resetConfirm,
};
