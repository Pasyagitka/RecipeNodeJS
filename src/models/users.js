module.exports = function DefineUsers(sequelize, DataTypes) {
    return sequelize.define('users', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: 'Email constraint',
        },
        login: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: 'Login constraint',
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        activationLink: {
            type: DataTypes.TEXT,
        },
        isGranted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        isActivated: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }
    }, {
        sequelize,
        tableName: 'users',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: 'Email constraint',
                unique: true,
                fields: [
                    { name: 'email' },
                ],
            },
            {
                name: 'Login constraint',
                unique: true,
                fields: [
                    { name: 'login' },
                ],
            },
            {
                name: 'users_pkey',
                unique: true,
                fields: [
                    { name: 'id' },
                ],
            },
        ],
    });
};
