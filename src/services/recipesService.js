const Recipes = require('../models').recipes;
const Categories = require('../models').categories;
const Users = require('../models').users;
const Meals = require('../models').meals;

const { NotExistsError } = require('../errors/customError');

exports.findAll = async () => {
    const all = await Recipes.findAll({
        raw: true,
        nest: true,
    });
    return all;
};

exports.create = async (data) => {
    const category = await Categories.findOne({ where: { category: data.category } });
    if (!category) throw new NotExistsError('categoryId');

    const author = await Users.findOne({ where: { id: data.authorId } });
    if (!author) throw new NotExistsError('authorId');

    const meal = await Meals.findOne({ where: { meal: data.meal } });
    if (!meal) throw new NotExistsError('mealId');

    return await Recipes.create({
        categoryId: category.id,
        authorId: author.id,
        mealId: meal.id,
        datePublished: Date.now(),
        timeToCook: data.timeToCook,
        instruction: data.instruction,
        title: data.title,
    });
};

exports.update = async (data) => {
    let category; let author; let
        meal;
    if (data.category) {
        category = await Categories.findOne({ where: { category: data.category } });
        if (!category) throw new NotExistsError();
    }

    if (data.authorId) {
        author = await Users.findOne({ where: { id: data.authorId } });
        if (!author) throw new NotExistsError();
    }

    if (data.meal) {
        meal = await Meals.findOne({ where: { meal: data.meal } });
        if (!meal) throw new NotExistsError();
    }

    const { id } = data;

    const exists = await Recipes.findOne({ where: { id } });
    if (!exists) throw new NotExistsError();

    const num = await Recipes.update({
        categoryId: category?.id ?? exists.categoryId,
        authorId: author?.id ?? exists.authorId,
        mealId: meal?.id ?? exists.mealId,
        timeToCook: data.timeToCook ?? exists.timeToCook,
        instruction: data.instruction ?? exists.instruction,
        title: data.title ?? exists.title,
    }, { where: { id } });
    if (num === 1) {
        return (data);
    }
    return null;
};

exports.delete = async (id) => {
    const exists = await Recipes.findOne({ where: { id } });
    if (!exists) throw new NotExistsError();
    const num = await Recipes.destroy({ where: { id } });
    return num ? exists : null;
};
