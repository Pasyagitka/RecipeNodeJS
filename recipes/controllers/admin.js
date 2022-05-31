const ingredientsService = require('../services/ingredientsService');
const categoriesService = require('../services/categoriesService');
const mealsService = require('../services/mealsService');
const recipesService = require('../services/recipesService');

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

async function renderAdminModerate(req, res, next) {
    try {
        res.render('adminmoderate', { title: 'Admin moderate'});
    } catch (e) {
        next(e);
    }
}

async function getRecipes(req, res, next) {
    try {
        const all = await recipesService.findAll();
        return res.json({recipeList: all});
    } catch (e) {
        next(e);
    }
}

async function getRecipesToModerate(req, res, next) {
    try {
        const all = await recipesService.findAllNotApproved();
        return res.json({recipeList: all});
    } catch (e) {
        next(e);
    }
}

async function approveRecipe(req, res, next) {
    try {
        let {id} = req.params;
        let recipe = await recipesService.approve(id);
        return res.json({recipe});
    } catch (e) {
        next(e);
    }
}

async function disapproveRecipe(req, res, next) {
    try {
        let {id} = req.params;
        await recipesService.delete(id);
        return res.end();
    } catch (e) {
        next(e);
    }
}

module.exports = {
    renderAdminModerate,
    getRecipesToModerate,
    approveRecipe,
    disapproveRecipe,
    getRecipes,
    renderAdminContent,
}