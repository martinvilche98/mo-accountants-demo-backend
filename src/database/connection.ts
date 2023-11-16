const { Sequelize } = require('sequelize');

const db = new Sequelize('postgres://mo_accountants_admin:Pass1234@localhost:5432/mo_accountants_db');

export default db;