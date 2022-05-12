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
    let all = await Recipes.findAll({
		//raw: true,
		nest: true,
        attributes: ['id', 'datePublished', 'timeToCook', 'title'],
		include: [
        {
            model: Users,
            required: true,
            as: "author",
            attributes: ['login'],
        },
        {
            model: Meals,
            required: true,
            as: "meal",
            // attributes: ['meal'],
        },
        {
            model: Categories,
            required: true,
            as: "category",
        },
        {
            model: Images,
            // required: true,
            as: "images",
            attributes: ['uri', 'description'],
        },
        {
            model: RecipeIngredients,
            as: "recipe_ingredients",
            include: [{
				model: Ingredients,
				as: "ingredient",
			},],
        },
        ],
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
    let recipe = await Recipes.findOne({
        where: {id},
		nest: true,
        attributes: ['id', 'datePublished', 'timeToCook', 'title', 'instruction'],
		include: [
        {
            model: Users,
            required: true,
            as: "author",
            attributes: ['login'],
        },
        {
            model: Meals,
            required: true,
            as: "meal",
        },
        {
            model: Categories,
            required: true,
            as: "category",
        },
        {
            model: Images,
            // required: true,
            as: "images",
            attributes: ['uri', 'description'],
        },
        {
            model: RecipeIngredients,
            as: "recipe_ingredients",
            include: [{
				model: Ingredients,
				as: "ingredient",
			},],
        },
        ],
	});
    return recipe ? recipe.toJSON() : null;
};



exports.create = async (data) => {
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

exports.update = async (data) => {
    let category; let author; let meal;
    if (data.category) {
        category = await Categories.findOne({ where: { category: data.category } });
        if (!category) throw new NotExistsError('category');
    }

    if (data.authorId) {
        author = await Users.findOne({ where: { id: data.authorId } });
        if (!author) throw new NotExistsError('user (author)');
    }

    if (data.meal) {
        meal = await Meals.findOne({ where: { meal: data.meal } });
        if (!meal) throw new NotExistsError('meal');
    }

    const { id } = data;

    const exists = await Recipes.findOne({ where: { id } });
    if (!exists) throw new NotExistsError('recipe');

    const upd = await Recipes.update({
        categoryId: category?.id ?? exists.categoryId,
        authorId: author?.id ?? exists.authorId,
        mealId: meal?.id ?? exists.mealId,
        timeToCook: data.timeToCook ?? exists.timeToCook,
        instruction: data.instruction ?? exists.instruction,
        title: data.title ?? exists.title,
    }, { where: { id } });

    return upd ? data : null;
};

exports.delete = async (id) => {
    const exists = await Recipes.findOne({ where: { id } });
    if (!exists) throw new NotExistsError('recipe');
    const result = await exists.destroy();
    return result ? exists : null;
};
