import { DataTypes } from 'sequelize';
import sequelize from '../config/app_config.js';

const UserToken = sequelize.define('UserToken', {
    token_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,  // Automatically incrementing the token_id
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'user_id',  // Make sure this references the correct 'users' table primary key
        },
        onDelete: 'CASCADE',
    },
    token_expiry: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'user_token',
    timestamps: false,  // If you're manually handling 'created_at' and 'updated_at'
});


export default UserToken;
