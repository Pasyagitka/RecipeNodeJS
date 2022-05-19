const { Joi } = require('express-validation');

const register = {
    body: Joi.object({
        login: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
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

const resetConfirm = {
    params: Joi.object({
        login: Joi.string().required(),
        link: Joi.string().required(),
    }),
};

module.exports = {
    register,
    login,
    sendReset,
    resetConfirm,
};
