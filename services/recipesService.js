const Recipes = require('../models').recipes;
const Categories = require('../models').categories;
const Users = require('../models').users;
const Meals = require('../models').meals;
const { Op } = require("sequelize");
const { NotExistsError } = require('../helpers/errors/customError');

//XXX Project.findAll({ offset: 5, limit: 5 });

exports.findAll = async () => {
    let all = await Recipes.scope('details', 'approved').findAll();
    all = all.map(r => r.toJSON());
    return all;
};

exports.findAllNotApproved = async () => {
    let all = await Recipes.scope('details', 'not-approved').findAll({where: {isApproved: false}});
    all = all.map(r => r.toJSON());
    return all;
};

exports.findAllForUser = async (authorId) => {
    let all = await Recipes.scope('details', 'approved').findAll({
        where: {authorId},
	});
    all = all.map(r => r.toJSON());
    return all;
};

exports.findOne = async (id) => {
    let recipe = await Recipes.scope('details', 'approved', 'full').findOne({
        where: {id},
	});
    return recipe ? recipe.toJSON() : null;
};

exports.search = async (query) => {
    let all = await Recipes.scope('details', 'approved').findAll({
        where: {
            [Op.or]: [
              { 'title': { [Op.iLike]: `%${query}%` } },
              { 'instruction': { [Op.iLike]: `%${query}%` } },
            ]
          },
    });
    all = all.map(r => r.toJSON());
    return all;
}    

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
        isApproved: false,
    });
    return {recipe: result, author: author.login};
};

exports.update = async ({id, categoryId, authorId, mealId, timeToCook, instruction, title}) => {
    let categoryExists; let authorExists; let mealExists;
    if (categoryId) {
        categoryExists = await Categories.findOne({ where: { id: categoryId } });
        if (!categoryExists) throw new NotExistsError('category');
    }

    if (authorId) {
        authorExists = await Users.findOne({ where: { id: authorId } });
        if (!authorExists) throw new NotExistsError('user (author)');
    }

    if (mealId) {
        mealExists = await Meals.findOne({ where: { meal: mealId } });
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

    return upd ? {category: categoryId, authorId, meal: mealId, id, timeToCook, instruction, title} : null;
};

exports.approve = async (id) => {
    const exists = await Recipes.scope('details', 'not-approved').findOne({ where: { id } });
    //const exists = await Recipes.findOne({ where: { id } });
    if (!exists) throw new NotExistsError('recipe');
    exists.isApproved = true;
    return await exists.save();
}

exports.delete = async (id) => {
    const exists = await Recipes.findOne({ where: { id } });
    if (!exists) throw new NotExistsError('recipe');
    const result = await exists.destroy();
    return result ? exists : null;
};
