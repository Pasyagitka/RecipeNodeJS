const recipesService = require('../services/recipesService');
const categoriesService = require('../services/categoriesService');
const mealsService = require('../services/mealsService');

const { NotExistsError } = require('../helpers/errors/customError');


async function getAddRecipes(req, res, next) {
    try {
        let categories = await categoriesService.findAll();
        let meals = await mealsService.findAll();
        res.render('addrecipe', { title: 'Add new recipe', categories, meals  });
    } catch (e) {
        next(e);
    }
}

async function getRecipe(req, res, next) {
    try {
        const { id } = req.params;
        let recipe = await recipesService.findOne(id);
        if(!recipe) throw new NotExistsError('recipe');
        res.render('recipe', { title: 'Recipe details', recipe: recipe });
    } catch (e) {
        next(e);
    }
}

async function getUserRecipes(req, res, next) {
    try {
        // console.log('user', req.user);
        let recipeList = await recipesService.findAll();
        res.render('userrecipes', { title: 'User`s recipes', recipeList});
    } catch (e) {
        next(e);
    }
}

async function findAll(req, res, next) {
    try {
        const all = await recipesService.findAll();
        return res.json(all);
    } catch (e) {
        next(e);
    }
}

async function create(req, res, next) {
    try {
        const data = await recipesService.create(req.body);
        return res.json(data);
    } catch (e) {
        next(e);
    }
}

async function update(req, res, next) {
    try {
        const num = await recipesService.update(req.body);
        return res.json(num);
    } catch (e) {
        next(e);
    }
}

async function remove(req, res, next) {
    try {
        const { id } = req.params;
        const result = await recipesService.delete(id);
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
    getAddRecipes,
    getUserRecipes,
    getRecipe,
};
