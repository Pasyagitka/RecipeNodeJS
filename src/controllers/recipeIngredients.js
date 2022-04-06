const recipeIngredients = require('../services/recipeIngredientsService');

exports.findAll = async (req, res, next) => {
    try {
        let recipeId = req.params.recipeId;
        const all = await recipeIngredients.findAllForRecipe(recipeId);
        return res.json(all);
    } catch (e) {
        next(e);
    }
};

exports.create = async (req, res, next) => {
    try {
        const data = await recipeIngredients.create(req.body);
        return res.json(data);
    } catch (e) {
        next(e);
    }
};

exports.update = async (req, res, next) => {
    try {
        const num = await recipeIngredients.update(req.body);
        return res.json(num);
    } catch (e) {
        next(e);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await recipeIngredients.delete(id);
        return res.json(result);
    } catch (e) {
        next(e);
    }
};
