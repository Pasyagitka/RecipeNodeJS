module.exports = function DefineRecipeIngredients(sequelize, DataTypes) {
    return sequelize.define('recipe_ingredients', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        recipeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'recipes',
                key: 'id',
            },
        },
        ingredientId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'ingredients',
                key: 'id',
            },
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
    }, {
        sequelize,
        tableName: 'recipe_ingredients',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: 'recipe_ingredients_pkey',
                unique: true,
                fields: [
                    { name: 'id' },
                ],
            },
        ],
    });
};
