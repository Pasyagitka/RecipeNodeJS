const { Joi } = require('express-validation');

const create = {
    body: Joi.object({
        category: Joi.string().required()
    }),
};

const update = {
    body: Joi.object({
        id: Joi.number().required(),
        category: Joi.string().required(),
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
