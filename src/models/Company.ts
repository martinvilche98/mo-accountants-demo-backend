import db from '../database/connection';
import { DataTypes } from 'sequelize';

const CompanyModel = db.define('mo_company', {

    company_name: { type: DataTypes.STRING(128), allowNull: false, unique: true,},

    fiscal_number: { type: DataTypes.STRING(12), allowNull: false, 
        validate: {
            is: /^[0-9]{3}-[0-9]{3}-[0-9]{3}$/i
        } },

    customer_number: { type: DataTypes.STRING(32), allowNull: false,
        valudate: {
            isNumeric: true,
        }},

  }, {
    freezeTableName: true,
    timestamps: true,
});

CompanyModel.sync({ alter: true })
export const Company = CompanyModel