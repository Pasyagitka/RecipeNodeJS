const Sequelize = require('sequelize');
const options = require('../configs/sequelizeconfig.json');

const connection = new Sequelize(process.env.DATABASE_URL, options);


module.exports = require('./init-models')(connection);
module.exports.token = require('./token');
