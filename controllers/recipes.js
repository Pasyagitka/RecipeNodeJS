const recipesService = require('../services/recipesService');
const categoriesService = require('../services/categoriesService');
const mealsService = require('../services/mealsService');

const { NotExistsError } = require('../helpers/errors/customError');

async function getRecipeJSON(req, res, next) {
    try {
        const { id } = req.params;
        let recipe = await recipesService.findOne(id);
        if(!recipe) throw new NotExistsError('recipe');
        res.json(recipe);
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


async function getAllRecipes(req, res, next) {
    try {
        const filters = req.query;
        let data = await recipesService.findAll();
        console.log('filters', filters);
        
        const recipeList = data.filter(r => {
            let isValid = true;
            for (key in filters) {
              let filterKeysArray = filters[key].split(',');
              if (key == 'category' || key == 'meal') {
                  isValid = isValid && filterKeysArray.includes(r[key][key]);
              }
              if (key == 'include') {
                let recipeIngredientNames = r['recipe_ingredients'].map(x=> x.ingredient.name);
                let allFounded = filterKeysArray.every(ai => {return recipeIngredientNames.includes(ai)} );
                isValid = isValid &&  allFounded;
              }
              if (key == 'exclude') {
                let recipeIngredientNames = r['recipe_ingredients'].map(x=> x.ingredient.name);
                let allFounded = filterKeysArray.some(ai => {return recipeIngredientNames.includes(ai)} );
                isValid = isValid &&  !allFounded;
              }
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
    getRecipeJSON,
};
