const ingredientsService = require('../services/ingredientsService');
const categoriesService = require('../services/categoriesService');
const mealsService = require('../services/mealsService');

async function renderAdminContent(req, res, next) {
    try {
        let mealsList = await mealsService.findAll();
        let categoriesList = await categoriesService.findAll();
        let ingredientsList = await ingredientsService.findAll();

        res.render('admincontent', { title: 'Admin content', mealsList, categoriesList,  ingredientsList });
    } catch (e) {
        next(e);
    }
}

module.exports = {
    renderAdminContent,
}
