module.exports = function DefineCookbooks(sequelize, DataTypes) {
    return sequelize.define('cookbooks', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        recipeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'recipes',
                key: 'id',
            },
        },
    }, {
        sequelize,
        tableName: 'cookbooks',
        schema: 'public',
        timestamps: false,
    });
};
