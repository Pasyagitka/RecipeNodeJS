const { DataTypes } = require('sequelize');
const Categories = require('./categories');
const Images = require('./images');
const Ingredients = require('./ingredients');
const Meals = require('./meals');
const Recipes = require('./recipes');
const Users = require('./users');


module.exports = function initModels(sequelize) {
    const categories = Categories(sequelize, DataTypes);
    const images = Images(sequelize, DataTypes);
    const ingredients = Ingredients(sequelize, DataTypes);
    const meals = Meals(sequelize, DataTypes);
    const recipes = Recipes(sequelize, DataTypes);
    const users = Users(sequelize, DataTypes);


    recipes.belongsTo(meals, { as: 'id_meal', foreignKey: 'id' });
    meals.hasOne(recipes, { as: 'recipe', foreignKey: 'id' });
    images.belongsTo(recipes, { as: 'id_recipe', foreignKey: 'id' });
    recipes.hasOne(images, { as: 'image', foreignKey: 'id' });

    return {
        categories,
        images,
        ingredients,
        meals,
        recipes,
        users,
    };
};
