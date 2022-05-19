const Op = require('sequelize').Op;
const Recipes = require('../models').recipes;
const Categories = require('../models').categories;
const Users = require('../models').users;
const Meals = require('../models').meals;
const RecipeIngredients = require('../models').recipeIngredients;
const Ingredients  = require('../models').ingredients;
const Images  = require('../models').images;

const { NotExistsError } = require('../helpers/errors/customError');

exports.findAll = async () => {
    let all = await Recipes.scope('details').findAll();
    all = all.map(r => r.toJSON());
    return all;
};

exports.findAllForUser = async (authorId) => {
    let all = await Recipes.scope('details').findAll({
        where: {authorId},
	});
    all = all.map(r => r.toJSON());
    return all;
};

// exports.findAllFiltered = async (categoriesFilter, mealsFilter, includesFilter, excludesFilter) => {
//     let all = await Recipes.findAll({
// 		nest: true,
//         attributes: ['id', 'datePublished', 'timeToCook', 'title'],
// 		include: [
//         {
//             model: Users,
//             required: true,
//             as: "author",
//             attributes: ['login'],
//         },
//         {
//             model: Meals,
//             required: true,
//             as: "meal",
//             // attributes: ['meal'],
//             where: {meal: {[Op.in]: mealsFilter}},
//         },
//         {
//             model: Categories,
//             required: true,
//             as: "category",
//             where: {category: {[Op.in]: categoriesFilter}},
//         },
//         {
//             model: Images,
//             // required: true,
//             as: "images",
//             attributes: ['uri', 'description'],
//         },
//         {
//             model: RecipeIngredients,
//             as: "recipe_ingredients",
//             include: [{
// 				model: Ingredients,
// 				as: "ingredient",
//                 where: {
//                     [Op.and]: [ 
//                         { name: {[Op.in]: includesFilter} },
//                         { name: {[Op.notIn]: excludesFilter} }
//                     ],
//                 }},
//             ],
//         },
//         ],
// 	});
//     all = all.map(r => r.toJSON());
//     return all;
// };

exports.findOne = async (id) => {
    let recipe = await Recipes.scope('details-full').findOne({
        where: {id},
	});
    return recipe ? recipe.toJSON() : null;
};


exports.create = async (data) => {
    //console.log(data);
    const category = await Categories.findOne({ where: { id: data.categoryId } });
    if (!category) throw new NotExistsError('categoryId');

    const author = await Users.findOne({ where: { id: data.authorId } });
    if (!author) throw new NotExistsError('authorId');

    const meal = await Meals.findOne({ where: { id: data.mealId } });
    if (!meal) throw new NotExistsError('mealId');


    const result = await Recipes.create({
        categoryId: category.id,
        authorId: author.id,
        mealId: meal.id,
        datePublished: Date.now(),
        timeToCook: data.timeToCook,
        instruction: data.instruction,
        title: data.title,
    });
    return result;
};

exports.update = async ({category, authorId, meal, id, timeToCook, instruction, title}) => {
    let categoryExists; let authorExists; let mealExists;
    if (category) {
        categoryExists = await Categories.findOne({ where: { category: category } });
        if (!categoryExists) throw new NotExistsError('category');
    }

    if (authorId) {
        authorExists = await Users.findOne({ where: { id: authorId } });
        if (!authorExists) throw new NotExistsError('user (author)');
    }

    if (meal) {
        mealExists = await Meals.findOne({ where: { meal: meal } });
        if (!mealExists) throw new NotExistsError('meal');
    }

    const exists = await Recipes.findOne({ where: { id } });
    if (!exists) throw new NotExistsError('recipe');

    const upd = await Recipes.update({
        categoryId: categoryExists?.id ?? exists.categoryId,
        authorId: authorExists?.id ?? exists.authorId,
        mealId: mealExists?.id ?? exists.mealId,
        timeToCook: timeToCook ?? exists.timeToCook,
        instruction: instruction ?? exists.instruction,
        title: title ?? exists.title,
    }, { where: { id } });

    return upd ? {category, authorId, meal, id, timeToCook, instruction, title} : null;
};

exports.delete = async (id) => {
    const exists = await Recipes.findOne({ where: { id } });
    if (!exists) throw new NotExistsError('recipe');
    const result = await exists.destroy();
    return result ? exists : null;
};