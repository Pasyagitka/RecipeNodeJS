const recipesService = require('../services/recipesService');

async function getIndex(req, res, next) {
    try {
        let recipeList = await recipesService.findAll();
        res.render('main', { title: 'Recipes', recipeList  });
    } catch (e) {
        next(e);
    }
}



module.exports = {
    getIndex,
};
