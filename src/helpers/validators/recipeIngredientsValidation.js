const { Joi } = require('express-validation');

const findAllForRecipe = {
    params: Joi.object({
        recipeId: Joi.number().required(),
    }),
};

const create = {
    body: Joi.object({
        recipeId: Joi.number().required(),
        ingredientId: Joi.number().required(),
        quantity: Joi.number().required(),
    }),
};

const update = {
    body: Joi.object({
        id: Joi.number().required(),
        recipeId: Joi.number(),
        ingredientId: Joi.number(),
        quantity: Joi.number(),
    }),
};

const remove = {
    params: Joi.object({
        id: Joi.number().required(),
    }),
};

module.exports = {
    findAllForRecipe,
    create,
    update,
    remove,
};
