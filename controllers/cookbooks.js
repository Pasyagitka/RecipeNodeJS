const cookbooksService = require('../services/cookbooksService');
const recipesService = require('../services/recipesService');

async function getCookbook(req, res, next) {
    try {
        let recipeList = await recipesService.findAll();
        res.render('cookbook', { title: 'Cookbook', recipeList  });
        // res.render('cookbook', { title: 'Cookbook'});
    } catch (e) {
        next(e);
    }
}

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
        console.log(req.params);
        const { recipeId } = req.params;
        const { userId } = req.body;
        const result = await cookbooksService.delete(recipeId, userId);
        //return res.renderPjax(result);
        return res.renderPjax('cookbook', { title: 'Cookbook', recipeList  });

    } catch (e) {
        next(e);
    }
}

module.exports = {
    findAllForUser,
    create,
    delete: remove,
    getCookbook,
};
