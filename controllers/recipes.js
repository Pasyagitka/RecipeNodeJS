const recipesService = require('../services/recipesService');
const categoriesService = require('../services/categoriesService');
const mealsService = require('../services/mealsService');

const { NotExistsError } = require('../helpers/errors/customError');

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


async function getAllRecipes(req, res, next) {
    try {
        console.log('getall')
        const filters = req.query;
        let data = await recipesService.findAll();
        const recipeList = data.filter(r => {
            let isValid = true;
            for (key in filters) {
              let keys = filters[key].split(',');
              console.log(key, r[key][key], filters[key]);
              isValid = isValid &&  keys.includes(r[key][key]);
            }
            return isValid;
        });
        res.json({recipeList});
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

module.exports = {
    getUserRecipes,
    getAllRecipes,
    getRecipe,
};
