const { Sequelize } = require('sequelize');
const logger = require('./logger');
const config = require('./config');

const sequelize = new Sequelize(
  config.mysql.database, 
  config.mysql.username, 
  config.mysql.password, 
  {
    dialect: config.mysql.dialect,
    host: config.mysql.host,
  }
);

sequelize.sync().then(() => logger.info('Tables have been created'));

module.exports = sequelize;