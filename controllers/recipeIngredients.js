const recipeIngredientsService = require('../services/recipeIngredientsService');

async function findAll(req, res, next) {
    try {
        const { recipeId } = req.params;
        const all = await recipeIngredientsService.findAllForRecipe(recipeId);
        return res.json(all);
    } catch (e) {
        next(e);
    }
}

async function create(req, res, next) {
    try {
        const data = await recipeIngredientsService.create(req.body);
        return res.json(data);
    } catch (e) {
        next(e);
    }
}

async function update(req, res, next) {
    try {
        const num = await recipeIngredientsService.update(req.body);
        return res.json(num);
    } catch (e) {
        next(e);
    }
}

async function remove(req, res, next) {
    try {
        const { id } = req.params;
        const result = await recipeIngredientsService.delete(id);
        return res.json(result);
    } catch (e) {
        next(e);
    }
}

module.exports = {
    findAll,
    create,
    update,
    delete: remove,
};
