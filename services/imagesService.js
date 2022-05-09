const Recipes = require('../models').recipes;
const Images = require('../models').images;

const { NotExistsError } = require('../errors/customError');

exports.findAllForRecipe = async (recipeId) => {
    const all = await Images.findAll({
        where: { recipeId },
        raw: true,
        nest: true,
    });
    return all;
};

exports.create = async (data) => {
    const recipe = await Recipes.findOne({ where: { id: data.id } });
    if (!recipe) throw new NotExistsError('recipe');

    const result = await Images.create({
        recipeId: recipe.id,
        uri: data.uri,
        description: data.id,
    });
    return result;
};

exports.update = async (data) => {
    let recipe;
    if (data.recipeId) {
        recipe = await Recipes.findOne({ where: { id: data.recipeId } });
        if (!recipe) throw new NotExistsError('recipe');
    }

    const { id } = data;
    const exists = await Images.findOne({ where: { id } });
    if (!exists) throw new NotExistsError('image');

    const upd = await Images.update({
        recipeId: data.recipeId ?? exists.recipeId,
        uri: data.uri ?? exists.uri,
        description: data.description ?? exists.description,
    }, { where: { id } });

    return upd ? data : null;
};

exports.delete = async (id) => {
    const exists = await Images.findOne({ where: { id } });
    if (!exists) throw new NotExistsError('image');
    const result = await exists.destroy();
    return result ? exists : null;
};
