const { Joi } = require('express-validation');

const create = {
    body: Joi.object({
        name: Joi.string().required(),
        measurement: Joi.string(),
    }),
};

const update = {
    body: Joi.object({
        id: Joi.number().required(),
        name: Joi.string(),
        measurement: Joi.string(),
    }),
};

const remove = {
    params: Joi.object({
        id: Joi.number().required(),
    }),
};

module.exports = {
    create,
    update,
    remove,
};
