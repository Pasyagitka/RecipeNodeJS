const cookbooksService = require('../services/cookbooksService');

async function findAllForUser(req, res, next) {
    try {
        const { userId } = req.body;
        const all = await cookbooksService.findAllForUser(userId);
        return res.json(all);
    } catch (e) {
        next(e);
    }
}

async function create(req, res, next) {
    try {
        const { recipeId, userId } = req.body;
        const data = await cookbooksService.create({ recipeId, userId });
        return res.json(data);
    } catch (e) {
        next(e);
    }
}

async function remove(req, res, next) {
    try {
        const { recipeId } = req.params;
        const { userId } = req.body;
        const result = await cookbooksService.delete(recipeId, userId);
        return res.json(result);
    } catch (e) {
        next(e);
    }
}

module.exports = {
    findAllForUser,
    create,
    delete: remove,
};
