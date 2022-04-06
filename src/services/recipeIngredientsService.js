const Ingredients = require('../models').ingredients;
const Recipes = require('../models').recipes;
const RecipeIngredients = require('../models').recipeIngredients;

const { NotExistsError } = require('../errors/customError');

exports.findAllForRecipe = async (recipeId) => {
    const all = await RecipeIngredients.findAll({
        where: { recipeId },
        raw: true,
        nest: true,
    });
    return all;
};

exports.create = async (data) => {
    const { recipeId, ingredientId, quantity } = data;

    const recipe = await Recipes.findOne({ where: { id: recipeId } });
    if (!recipe) throw new NotExistsError('recipe');

    const ingredient = await Ingredients.findOne({ where: { id: ingredientId } });
    if (!ingredient) throw new NotExistsError('ingredient');

    const result = await RecipeIngredients.create({
        ingredientId: ingredient.id,
        recipeId: recipe.id,
        quantity,
    });
    return result;
};

exports.update = async (data) => {
    let recipe; let ingredient;

    if (data.recipe) {
        recipe = await Recipes.findOne({ where: { recipeId: data.recipeId } });
        if (!recipe) throw new NotExistsError('recipe');
    }

    if (data.ingredient) {
        ingredient = await Ingredients.findOne({ where: { ingredientId: data.ingredientId } });
        if (!ingredient) throw new NotExistsError('ingredient');
    }

    const { id } = data;

    const exists = await RecipeIngredients.findOne({ where: { id } });
    if (!exists) throw new NotExistsError('recipe ingredient');

    const upd = await RecipeIngredients.update({
        ingredientId: ingredient?.id ?? exists.ingredientId,
        recipeId: recipe?.id ?? exists.recipeId,
        quantity: data.quantity ?? exists.quantity,
    }, { where: { id } });

    return upd ? data : null;
};

exports.delete = async (id) => {
    const exists = await RecipeIngredients.findOne({ where: { id } });
    if (!exists) throw new NotExistsError('recipe ingredients record');
    const result = await exists.destroy();
    return result ? exists : null;
};
