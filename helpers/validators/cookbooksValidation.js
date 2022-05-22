const { Joi } = require('express-validation');

const create = {
    params: Joi.object({
        recipeId: Joi.number().required(),
    }),
};

const remove = {
    params: Joi.object({
        recipeId: Joi.number().required(),
    })
};

module.exports = {
    create,
    remove,
};
