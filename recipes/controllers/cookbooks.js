const cookbooksService = require('../services/cookbooksService');

async function renderCookbook(req, res, next) {
    try {
        res.render('cookbook', { title: 'Cookbook'  });
    } catch (e) {
        next(e);
    }
}

async function findAllForUser(req, res, next) {
    try {
        const userId = req.user.id;
        const all = await cookbooksService.findAllForUser(userId);
        return res.json({cookbooks: all});
    } catch (e) {
        next(e);
    }
}

async function create(req, res, next) {
    try {
        const data = await cookbooksService.create({userId: req.user.id, recipeId: req.params.recipeId});
        return res.json(data);
    } catch (e) {
        next(e);
    }
}

async function remove(req, res, next) {
    try {
        const { recipeId } = req.params;
        const userId = req.user.id;
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
    renderCookbook,
};
