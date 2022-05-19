const Ingredients = require('../models').ingredients;
const Recipes = require('../models').recipes;
const RecipeIngredients = require('../models').recipeIngredients;

const { NotExistsError } = require('../helpers/errors/customError');

exports.findAllForRecipe = async (recipeId) => {
    const all = await RecipeIngredients.findAll({
        where: { recipeId },
        raw: true,
        nest: true,
    });
    return all;
};

exports.findByIdForRecipe = async(recipeId, ingredientId) => {
    const all = await RecipeIngredients.findOne({
        where: { recipeId, ingredientId },
        raw: true,
        nest: true,
    });
    return all;
}

exports.create = async ({ recipeId, ingredientId, quantity }) => {
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

exports.update = async ({ recipeId, ingredientId, quantity }) => {
    let recipe; let ingredient;

    if (recipeId) {
        recipe = await Recipes.findOne({ where: { id: recipeId } });
        if (!recipe) throw new NotExistsError('recipe');
    }

    if (ingredientId) {
        ingredient = await Ingredients.findOne({ where: { id: ingredientId } });
        if (!ingredient) throw new NotExistsError('ingredient');
    }

    const exists = await RecipeIngredients.findOne({
        where: { recipeId, ingredientId },
        raw: true,
        nest: true,
    });
    if (!exists) throw new NotExistsError('recipe ingredient');

    const upd = await RecipeIngredients.update({
        ingredientId: ingredient?.id ?? exists.ingredientId,
        recipeId: recipe?.id ?? exists.recipeId,
        quantity: quantity ?? exists.quantity,
    }, { where: { recipeId, ingredientId } });

    return upd ? {id, recipeId, ingredientId, quantity} : null;
};

exports.delete = async (recipeId, ingredientId) => {
    const exists = await RecipeIngredients.findOne({ where: { recipeId, ingredientId } });
    //if (!exists) throw new NotExistsError('recipe ingredients record');
    const result = await exists.destroy();
    return result ? exists : null;
};
