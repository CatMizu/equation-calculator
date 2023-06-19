const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Parameter extends Model {}

Parameter.init(
  {
    equation: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Equations',
        key: 'id',
      },
      allowNull: false,
    },
    name: {
      type: DataTypes.CHAR(1),
      allowNull: false,
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Parameter',
    timestamps: true,
  }
);

Parameter.prototype.toJSON = function () {
  const values = { ...this.get() };
  delete values.createdAt;
  delete values.updatedAt;
  delete values.equation;

  return values;
};

module.exports = Parameter;
