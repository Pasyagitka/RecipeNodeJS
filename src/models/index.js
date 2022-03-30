const Sequelize = require('sequelize');
const options = require('../configs/dbconfig.json');
require('dotenv').config();

const connection = new Sequelize(process.env.DATABASE_URL, options);

module.exports = require('./init-models')(connection);
