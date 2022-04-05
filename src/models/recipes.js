module.exports = function DefineRecipes(sequelize, DataTypes) {
    return sequelize.define('recipes', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'meals',
                key: 'id',
            },
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        authorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        mealId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        datePublished: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        timeToCook: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        instruction: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: 'recipes',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: 'recipes_pkey',
                unique: true,
                fields: [
                    { name: 'id' },
                ],
            },
        ],
    });
};
