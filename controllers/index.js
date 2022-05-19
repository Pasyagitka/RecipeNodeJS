const categoriesService = require('../services/categoriesService');
const mealsService = require('../services/mealsService');
const ingredientsService = require('../services/ingredientsService');

async function getIndex(req, res, next) {
    try {
        let meals = await mealsService.findAll();
        let categories = await categoriesService.findAll();
        let ingredients = await ingredientsService.findAll();

        res.render('main', { title: 'Recipes', categories, meals, ingredients });
    } catch (e) {
        next(e);
    }
}

module.exports = {
    getIndex,
};
