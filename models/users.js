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
        isGranted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        isActivated: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        activationLink: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        resetPasswordLink: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        temporaryPassword: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    }, {
        sequelize,
        tableName: 'users',
        schema: 'public',
        // paranoid: true,
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
