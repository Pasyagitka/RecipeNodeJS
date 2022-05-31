const { Joi } = require('express-validation');

const create = {
    body: Joi.object({
        category: Joi.string().required(),
    }),
};

const get = {
    params: Joi.object({
        id: Joi.number().required(),
    }),
};

const update = {
    body: Joi.object({
        id: Joi.number().required(),
        category: Joi.string(),
    }),
};

const remove = {
    params: Joi.object({
        id: Joi.number().required(),
    }),
};

module.exports = {
    get,
    create,   
    update,
    remove,
};
