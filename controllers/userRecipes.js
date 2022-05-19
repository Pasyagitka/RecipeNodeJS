const recipesService = require('../services/recipesService');
const categoriesService = require('../services/categoriesService');
const mealsService = require('../services/mealsService');
const ingredientsService = require('../services/ingredientsService');
const recipeIngredientsService = require('../services/recipeIngredientsService');

const { NotExistsError, UnauthorizedError } = require('../helpers/errors/customError');
const imagesService = require('../services/imagesService');


async function getAddRecipes(req, res, next) {
    try {
        let categories = await categoriesService.findAll();
        let meals = await mealsService.findAll();
        let ingredients = await ingredientsService.findAll();
        res.render('addrecipe', { title: 'Add new recipe', categories, meals, ingredients  });
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
        let categories = await categoriesService.findAll();
        let meals = await mealsService.findAll();
        let ingredients = await ingredientsService.findAll();
        res.render('userrecipes', { title: 'User`s recipes', categories, ingredients, meals});
    } catch (e) {
        next(e);
    }
}

async function findAllForUser(req, res, next) {
    try {
        const all = await recipesService.findAllForUser(req.user.id);
        return res.json({recipeList: all});
    } catch (e) {
        next(e);
        
    }
}

async function create(req, res, next) {
    try {
        let {ingredients, file} = req.body;
        const recipe = await recipesService.create({authorId: req.user.id, ...req.body});
        let recipeId = recipe.id;
        ingredients.forEach(async (ingredient) => {
            let {ingredientId, quantity} = ingredient;
            if(quantity !== 0) await recipeIngredientsService.create({ recipeId, ingredientId, quantity });
        });
            await imagesService.create({id: recipeId, file});
        
        return res.json(recipe);
    } catch (e) {
        next(e);
    }
}

async function update(req, res, next) {
    try {
        let {id, category, authorId, meal, timeToCook, instruction, title, file} = req.body;
        let {ingredients} = req.body;

        if (req.user.id != authorId) throw new UnauthorizedError();

        const num = await recipesService.update(req.body);

        ingredients.forEach(async (ingredient) => {
            let {ingredientId, quantity} = ingredient;
            let ingrFound = await recipeIngredientsService.findOneForRecipe(id, ingredientId);
            console.log(ingrFound);
            if (quantity != 0) {
                    if (ingrFound) {
                        await recipeIngredientsService.update({ recipeId: id, ingredientId, quantity });
                    }
                    else {
                        await recipeIngredientsService.create({ recipeId: id, ingredientId, quantity });
                    }
                }
            else {
                if (ingrFound) {
                    await recipeIngredientsService.delete(id, ingredientId);
                }
            } 
        });

        await imagesService.update({recipeId: id, file: file, description: req.body.description});

        return res.json(num);

        //return res.redirect('/userrecipes/');
    } catch (e) {
        next(e);
    }
}

async function remove(req, res, next) {
    try {
        const { id } = req.params;
        const result = await recipesService.delete(id);
        return res.json(result);
        //return res.redirect('/userrecipes/');
    } catch (e) {
        next(e);
    }
}

module.exports = {
    // findAll,
    create,
    update,
    delete: remove,
    getAddRecipes,
    getUserRecipes,
    getRecipe,
    findAllForUser,
};
