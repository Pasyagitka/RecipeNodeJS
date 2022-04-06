const { DataTypes } = require('sequelize');
const Categories = require('./categories');
const Images = require('./images');
const Ingredients = require('./ingredients');
const Meals = require('./meals');
const Recipes = require('./recipes');
const Users = require('./users');
const RecipeIngredients = require('./recipeIngredients');
const Cookbooks = require('./cookbooks');

module.exports = function initModels(sequelize) {
    const categories = Categories(sequelize, DataTypes);
    const images = Images(sequelize, DataTypes);
    const ingredients = Ingredients(sequelize, DataTypes);
    const meals = Meals(sequelize, DataTypes);
    const recipes = Recipes(sequelize, DataTypes);
    const users = Users(sequelize, DataTypes);
    const recipeIngredients = RecipeIngredients(sequelize, DataTypes);
    const cookbooks = Cookbooks(sequelize, DataTypes);

    recipes.belongsTo(categories, { as: 'category', foreignKey: 'categoryId' });
    categories.hasMany(recipes, { as: 'recipes', foreignKey: 'categoryId' });

    recipeIngredients.belongsTo(ingredients, { as: 'ingredient', foreignKey: 'ingredientId' });
    ingredients.hasMany(recipeIngredients, { as: 'recipe_ingredients', foreignKey: 'ingredientId' });

    recipes.belongsTo(meals, { as: 'meal', foreignKey: 'mealId' });
    meals.hasMany(recipes, { as: 'recipes', foreignKey: 'mealId' });

    images.belongsTo(recipes, { as: 'recipe', foreignKey: 'recipeId' });
    recipes.hasMany(images, { as: 'images', foreignKey: 'recipeId' });

    recipeIngredients.belongsTo(recipes, { as: 'recipe', foreignKey: 'recipeId' });
    recipes.hasMany(recipeIngredients, { as: 'recipe_ingredients', foreignKey: 'recipeId' });

    recipes.belongsTo(users, { as: 'author', foreignKey: 'authorId' });
    users.hasMany(recipes, { as: 'recipes', foreignKey: 'authorId' });

    cookbooks.belongsTo(users, { as: 'user', foreignKey: 'userId' });
    users.hasMany(cookbooks, { as: 'cookbooks', foreignKey: 'userId' });

    return {
        categories,
        images,
        ingredients,
        meals,
        recipes,
        users,
        recipeIngredients,
        cookbooks
    };
};
