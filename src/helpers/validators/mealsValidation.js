const { Joi } = require('express-validation');

const create = {
    body: Joi.object({
        meal: Joi.string().required()
    }),
};

const update = {
    body: Joi.object({
        id: Joi.number().required(),
        meal: Joi.string(),
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
