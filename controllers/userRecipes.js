const recipesService = require('../services/recipesService');
const categoriesService = require('../services/categoriesService');
const mealsService = require('../services/mealsService');
const ingredientsService = require('../services/ingredientsService');
const recipeIngredientsService = require('../services/recipeIngredientsService');

const { NotExistsError, UnauthorizedError } = require('../helpers/errors/customError');
const imagesService = require('../services/imagesService');


async function renderAddRecipe(req, res, next) {
    try {
        let categories = await categoriesService.findAll();
        let meals = await mealsService.findAll();
        let ingredients = await ingredientsService.findAll();
        res.render('addrecipe', { title: 'Add new recipe', categories, meals, ingredients  });
    } catch (e) {
        next(e);
    }
}

async function renderRecipeDetails(req, res, next) {
    try {
        const { id } = req.params;
        let recipe = await recipesService.findOne(id);
        if(!recipe) throw new NotExistsError('recipe');
        res.render('recipe', { title: 'Recipe details', recipe: recipe });
    } catch (e) {
        next(e);
    }
}

async function renderUserRecipes(req, res, next) {
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
        console.log(req.user);
        const all = await recipesService.findAllForUser(req.user.id);
        return res.json({recipeList: all});
    } catch (e) {
        next(e);
    }
}

//XXX create = activate acccount
async function create(req, res, next) {
    try {
        let {ingredients, file} = req.body;
        const {recipe, author} = (await recipesService.create({authorId: req.user.id, ...req.body}));
        let recipeId = recipe.id;
        ingredients.forEach(async (ingredient) => {
            let {ingredientId, quantity} = ingredient;
            if(quantity !== 0) await recipeIngredientsService.create({ recipeId, ingredientId, quantity });
        });
        await imagesService.create({id: recipeId, file});
        
        return res.json({recipe, author});
    } catch (e) {
        next(e);
    }
}

//BUG not updates if create new ingredient
async function update(req, res, next) {
    try {
        let {id, categoryId, authorId, mealId, timeToCook, instruction, title, file, ingredients} = req.body;

        if (req.user.id != authorId) throw new UnauthorizedError();

        const num = await recipesService.update(req.body);

        console.log(ingredients);
        ingredients.forEach(async (ingredient) => {
            let {ingredientId, quantity} = ingredient;
            let ingrFound = await recipeIngredientsService.findByIdForRecipe({recipeId: id, ingredientId});
            console.log(quantity, ingredientId);
            if (quantity != 0) {
                    if (ingrFound) {
                        await recipeIngredientsService.update({ recipeId: id, ingredientId, quantity });
                        console.log('upd')
                    }
                    else {
                        await recipeIngredientsService.create({ recipeId: id, ingredientId, quantity });
                        console.log('create');
                    }
                }
            else {
                if (ingrFound) {
                    await recipeIngredientsService.delete({recipeId: id, ingredientId});
                    console.log('delete')

                }
            } 
        });
        await imagesService.update({recipeId: id, file: file, description: req.body.description});
        return res.json(num);
    } catch (e) {
        next(e);
    }
}

async function remove(req, res, next) {
    try {
        const { id } = req.params;
        const {authorId} = req.body;
        console.log('del', req.body);
        if (req.user.id != authorId && req.user.isGranted === false) throw new UnauthorizedError();
        const result = await recipesService.delete(id);
        return res.json(result);
    } catch (e) {
        next(e);
    }
}

module.exports = {
    renderAddRecipe,
    renderUserRecipes,
    renderRecipeDetails,
    create,
    update,
    delete: remove,
    findAllForUser,
};
