module.exports = function DefineIngredients(sequelize, DataTypes) {
    return sequelize.define('ingredients', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: 'Name constraint',
        },
        measurement: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    }, {
        sequelize,
        tableName: 'ingredients',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: 'Name constraint',
                unique: true,
                fields: [
                    { name: 'name' },
                ],
            },
            {
                name: 'ingridients_pkey',
                unique: true,
                fields: [
                    { name: 'id' },
                ],
            },
        ],
    });
};
