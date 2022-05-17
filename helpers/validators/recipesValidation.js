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
        ingredients: Joi.array(),
        file: Joi.any(),
    }),
};

const update = {
    body: Joi.object({
        category: Joi.string(),
        meal: Joi.string(),
        timeToCook: Joi.number(),
        instruction: Joi.string(),
        title: Joi.string(),
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
