/* eslint-disable import/no-extraneous-dependencies */
const bcrypt = require('bcryptjs');
const faker = require('faker');
const { Sequelize } = require('../../src/config/database');
const User = require('../../src/models/user.model');

const password = 'password1';
const hashedPassword = bcrypt.hashSync(password, 8);

const userOne = {
  id: Sequelize.Utils.toDefaultValue(Sequelize.UUIDV4),
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password: hashedPassword,
  role: 'user',
  isEmailVerified: false,
};

const userTwo = {
  id: Sequelize.Utils.toDefaultValue(Sequelize.UUIDV4),
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password: hashedPassword,
  role: 'user',
  isEmailVerified: false,
};

const insertUsers = async (users) => {
  await User.bulkCreate(users);
};

module.exports = {
  userOne,
  userTwo,
  insertUsers,
};
