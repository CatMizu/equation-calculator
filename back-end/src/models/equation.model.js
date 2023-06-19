const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Equation extends Model {}

Equation.init(
  {
    latex: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Equation',
    timestamps: true,
  }
);

Equation.prototype.toJSON = function () {
  const values = { ...this.get() };
  delete values.createdAt;
  delete values.updatedAt;
  delete values.user;

  return values;
};

module.exports = Equation;
