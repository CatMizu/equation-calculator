const { Sequelize } = require('sequelize');
const logger = require('./logger');

const sequelize = new Sequelize('equation_calculator', 'root', 'ZhrmghgApple123.', {
  dialect: 'mysql',
  host: '127.0.0.1',
});

sequelize.sync().then(() => logger.info('Tables have been created'));

module.exports = sequelize;
