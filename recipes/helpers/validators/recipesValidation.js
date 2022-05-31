const { Joi } = require('express-validation');

const get = {
    params: Joi.object({
        id: Joi.number().required(),
    }),
};

const create = {
    body: Joi.object({
        categoryId: Joi.number().required(),
        mealId: Joi.number().required(),
        timeToCook: Joi.number().required(),
        instruction: Joi.string().required(),
        title: Joi.string().required(),
        ingredients: Joi.array().items(
            Joi.object().keys({
                ingredientId: Joi.number().required(),
                quantity: Joi.number().required(),
            })
        ),
        file: Joi.any(),
    }),
};

const update = {
    body: Joi.object({
        id: Joi.number(),
        categoryId: Joi.number(),
        authorId: Joi.number(),
        mealId: Joi.number(),
        timeToCook: Joi.number(),
        instruction: Joi.string(),
        title: Joi.string(),
        ingredients: Joi.array().items(
            Joi.object().keys({
                ingredientId: Joi.number().required(),
                quantity: Joi.number().required(),
            })
        ),
        file: Joi.any(),
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
