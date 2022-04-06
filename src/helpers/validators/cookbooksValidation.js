const { Joi } = require('express-validation');

const findAllForUser = {
    body: Joi.object({
        userId: Joi.number().required(),
    }),
};

const create = {
    body: Joi.object({
        userId: Joi.number().required(),
        recipeId: Joi.number().required(),
    }),
};


const remove = {
    params: Joi.object({
        recipeId: Joi.number().required(),
    }),
    body: Joi.object({
        userId: Joi.number().required(),
    }),
};

module.exports = {
    findAllForUser,
    create,
    remove,
};
