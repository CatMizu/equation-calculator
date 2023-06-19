const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const { tokenTypes } = require('../config/tokens');

class Token extends Model {}

Token.init(
  {
    token: {
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
    type: {
      type: DataTypes.ENUM(tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD),
      allowNull: false,
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    blacklisted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'Token',
    timestamps: true,
  }
);

module.exports = Token;
