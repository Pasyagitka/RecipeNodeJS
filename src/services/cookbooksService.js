const Recipes = require('../models').recipes;
const Users = require('../models').users;
const Cookbooks = require('../models').cookbooks;

const { AlreadyExistsError, NotExistsError } = require('../errors/customError');

exports.findAllForUser = async (userId) => {
    const all = await Cookbooks.findAll({
        where: { userId },
        raw: true,
        nest: true,
    });
    return all;
};

exports.create = async (data) => {
    const { recipeId, userId } = data;
    const cookbook = await Cookbooks.findOne({ where: { userId, recipeId } });
    if (cookbook) throw new AlreadyExistsError('cookbook');

    const recipe = await Recipes.findOne({ where: { id: recipeId } });
    if (!recipe) throw new NotExistsError('recipe');

    const user = await Users.findOne({ where: { id: userId } });
    if (!user) throw new NotExistsError('user');

    const result = await Cookbooks.create({
        userId: user.id,
        recipeId: recipe.id,
    });
    return result;
};

exports.delete = async (recipeId, userId) => {
    const exists = await Cookbooks.findOne({ where: { recipeId, userId } });
    if (!exists) throw new NotExistsError('cookbook record');
    const result = await exists.destroy();
    return result ? exists : null;
};
