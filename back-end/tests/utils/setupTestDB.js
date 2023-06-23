const logger = require('../../src/config/logger');
const { sequelize } = require('../../src/config/database');

const setupTestDB = () => {
  beforeAll(async () => {
    try {
      await sequelize.authenticate();
      logger.info('Connected to PostgreSQL for testing');
    } catch (error) {
      logger.error('Could not connect to PostgreSQL for testing', error);
      throw error;
    }
  });

  beforeEach(async () => {
    try {
      await sequelize.sync({ force: true });
      logger.info('Cleared PostgreSQL data');
    } catch (error) {
      logger.error('Could not clear PostgreSQL data', error);
      throw error;
    }
  });

  afterAll(async () => {
    try {
      await sequelize.close();
      logger.info('Disconnected from PostgreSQL after testing');
    } catch (error) {
      logger.error('Could not disconnect from PostgreSQL', error);
      throw error;
    }
  });
};

module.exports = setupTestDB;
