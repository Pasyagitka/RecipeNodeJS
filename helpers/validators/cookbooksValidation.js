const { Joi } = require('express-validation');

const findAllForUser = {
    body: Joi.object({
    }),
};

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
    findAllForUser,
    create,
    remove,
};
