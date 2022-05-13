module.exports = function DefineMeals(sequelize, DataTypes) {
    return sequelize.define('meals', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        meal: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: 'Meal constraint',
        },
    }, {
        sequelize,
        tableName: 'meals',
        schema: 'public',
        //paranoid: true,
        timestamps: false,
        indexes: [
            {
                name: 'Meal constraint',
                unique: true,
                fields: [
                    { name: 'meal' },
                ],
            },
            {
                name: 'meals_pkey',
                unique: true,
                fields: [
                    { name: 'id' },
                ],
            },
        ],
    });
};
