const { DataTypes, Op } = require('sequelize');
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

    recipes.belongsTo(categories, { as: 'category', foreignKey: 'categoryId', onDelete: 'SET NULL' });
    categories.hasMany(recipes, { as: 'recipes', foreignKey: 'categoryId' });

    recipeIngredients.belongsTo(ingredients, { as: 'ingredient', foreignKey: 'ingredientId', onDelete: 'SET NULL' });
    ingredients.hasMany(recipeIngredients, { as: 'recipe_ingredients', foreignKey: 'ingredientId' });

    recipes.belongsTo(meals, { as: 'meal', foreignKey: 'mealId', onDelete: 'SET NULL' });
    meals.hasMany(recipes, { as: 'recipes', foreignKey: 'mealId' });

    images.belongsTo(recipes, { as: 'recipe', foreignKey: 'recipeId', onDelete: 'cascade' });
    recipes.hasMany(images, { as: 'images', foreignKey: 'recipeId' });

    recipeIngredients.belongsTo(recipes, { as: 'recipe', foreignKey: 'recipeId', onDelete: 'cascade' });
    recipes.hasMany(recipeIngredients, { as: 'recipe_ingredients', foreignKey: 'recipeId' });

    recipes.belongsTo(users, { as: 'author', foreignKey: 'authorId', onDelete: 'cascade' });
    users.hasMany(recipes, { as: 'recipes', foreignKey: 'authorId' });

    cookbooks.belongsTo(users, { as: 'user', foreignKey: 'userId', onDelete: 'cascade' });
    users.hasMany(cookbooks, { as: 'cookbooks', foreignKey: 'userId' });

    cookbooks.belongsTo(recipes, { as: "recipe", foreignKey: "recipeId", onDelete: 'cascade'});
    recipes.hasMany(cookbooks, { as: "cookbooks", foreignKey: "recipeId"});


    recipes.addScope("details", {
		nest: true,
		where: { isApproved: true},
		attributes: ["id", "datePublished", "timeToCook", "title"],
		include: [ {
				model: users,
				required: true,
				as: "author",
				attributes: ["login", "id"],
			}, {
				model: meals,
				required: true,
				as: "meal",
			}, {
				model: categories,
				required: true,
				as: "category",
			}, {
				model: images,
				as: "images",
				attributes: ["uri", "description"],
			}, {
				model: recipeIngredients,
				as: "recipe_ingredients",
				include: [ {
						model: ingredients,
						as: "ingredient",
					},
				],
				
			},
		],
		order: [
			['datePublished', 'DESC'],
		]
	});

	recipes.addScope("details-not-approved", {
		nest: true,
		where: { isApproved: false},
		attributes: ["id", "datePublished", "timeToCook", "title"],
		include: [ {
				model: users,
				required: true,
				as: "author",
				attributes: ["login", "id"],
			}, {
				model: meals,
				required: true,
				as: "meal",
			}, {
				model: categories,
				required: true,
				as: "category",
			}, {
				model: images,
				as: "images",
				attributes: ["uri", "description"],
			}, {
				model: recipeIngredients,
				as: "recipe_ingredients",
				include: [ {
						model: ingredients,
						as: "ingredient",
					},
				],
			},
		],
		order: [
			['datePublished', 'DESC'],
		]
	});

    recipes.addScope("details-full", {
		nest: true,
		attributes: ["id", "datePublished", "timeToCook", "title", "instruction"],
		include: [ {
				model: users,
				required: true,
				as: "author",
				attributes: ["login", "id"],
			}, {
				model: meals,
				required: true,
				as: "meal",
			}, {
				model: categories,
				required: true,
				as: "category",
			}, {
				model: images,
				as: "images",
				attributes: ["uri", "description"],
			}, {
				model: recipeIngredients,
				as: "recipe_ingredients",
				include: [ {
						model: ingredients,
						as: "ingredient",
					},
				],
			},
		],
		order: [
			['datePublished', 'DESC'],
		]
	});

    return {
        categories,
        images,
        ingredients,
        meals,
        recipes,
        users,
        recipeIngredients,
        cookbooks,
    };
};
