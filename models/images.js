module.exports = function DefineImages(sequelize, DataTypes) {
    return sequelize.define('images', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        uri: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
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
        tableName: 'images',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: 'images_pkey',
                unique: true,
                fields: [
                    { name: 'id' },
                ],
            },
        ],
    });
};
