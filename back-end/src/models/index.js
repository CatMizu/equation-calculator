const Token = require('./token.model');
const User = require('./user.model');
const Equation = require('./equation.model');
const Parameter = require('./parameter.model');

User.hasMany(Equation, {
  foreignKey: 'user',
  as: 'equations',
});

Equation.belongsTo(User, {
  foreignKey: 'user',
  as: 'equationUer', // optional
});

Equation.hasMany(Parameter, {
  foreignKey: 'equation',
  as: 'parameters', // optional
});

Parameter.belongsTo(Equation, {
  foreignKey: 'equation',
  as: 'relatedEquation', // optional
});

module.exports = {
  Token,
  User,
  Equation,
  Parameter,
};
