module.exports = function DefineCookbooks(sequelize, DataTypes) {
    return sequelize.define('cookbooks', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        recipeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'recipes',
                key: 'id',
            },
        },
    }, {
        sequelize,
        tableName: 'cookbooks',
        schema: 'public',
        //paranoid: true,
        timestamps: false,
        indexes: [
            {
                name: 'cookbooks_pkey',
                unique: true,
                fields: [
                    { name: 'userId' },
                    { name: 'recipeId' },
                ],
            },
        ],
    });
};
