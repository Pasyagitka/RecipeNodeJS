module.exports = function DefineCategories(sequelize, DataTypes) {
    return sequelize.define('categories', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        category: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: 'Category constraint',
        },
    }, {
        sequelize,
        tableName: 'categories',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: 'Category constraint',
                unique: true,
                fields: [
                    { name: 'category' },
                ],
            },
            {
                name: 'categories_pkey',
                unique: true,
                fields: [
                    { name: 'id' },
                ],
            },
        ],
    });
};
