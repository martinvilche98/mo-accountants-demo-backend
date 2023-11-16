import db from '../database/connection';
import { DataTypes } from 'sequelize';

const UserModel = db.define('mo_user', {

    email: { type: DataTypes.STRING(320), allowNull: false, unique: true, 
        validate: {
            isEmail: true,
        } },

    password: { type: DataTypes.STRING(128), allowNull: false, 
        validate: {
            is: /^[0-9a-f]{128}$/i
        } },

    salt: { type: DataTypes.STRING(32), allowNull: false },

    first_name: { type: DataTypes.STRING(128), allowNull: false,
        valudate: {
            isAlpha: true,
        }},

    last_name: { type: DataTypes.STRING(128), allowNull: false,
        valudate: {
            isAlpha: true,
        }},

    group: {
        type: DataTypes.ENUM,
        values: ['admin', 'analyst', 'accountant']
        }

  }, {
    freezeTableName: true,
    timestamps: true,
});




UserModel.sync({ alter: true })

export const User = UserModel