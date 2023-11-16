import db from '../database/connection';
import { DataTypes } from 'sequelize';
import {Company} from './Company';

const CompanyReceiptModel = db.define('mo_company_receipt', {

    company_id: { type: DataTypes.INTEGER , allowNull: false, unique: false, 
        references: {
            model: 'mo_company',
            key: 'id',
            },
        validate: {
            isNumeric: true,
        } },

    emitted_at: { type: DataTypes.DATEONLY , allowNull: false, unique: false, 
        validate: {
            isDate: true,
        } },

    tax_amount: { type: DataTypes.DECIMAL , allowNull: true, unique: false, 
        validate: {
            isDecimal: true,
        } },

    tax_percentage: { type: DataTypes.DECIMAL , allowNull: true, unique: false, 
        validate: {
            isDecimal: true,
        } },

    is_approved: { type: DataTypes.BOOLEAN , allowNull: false, unique: false, default: false}
   
  }, {
    freezeTableName: true,
    timestamps: true,
});

CompanyReceiptModel.belongsTo(Company)

CompanyReceiptModel.sync({ alter: true })
export const CompanyReceipt = CompanyReceiptModel