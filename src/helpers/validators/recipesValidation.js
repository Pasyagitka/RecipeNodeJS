const { Joi } = require('express-validation');

const create = {
    body: Joi.object({
        category: Joi.string().required(),
        authorId: Joi.number().required(),
        meal: Joi.string().required(),
        timeToCook: Joi.number().required(),
        instruction: Joi.string().required(),
        title: Joi.string().required(),
    }),
};

const update = {
    body: Joi.object({
        id: Joi.number().required(),
        category: Joi.string(),
        authorId: Joi.number(),
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
    create,   
    update,
    remove,
};
