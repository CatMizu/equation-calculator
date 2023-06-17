const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcryptjs');
const { roles } = require('../config/roles');
const sequelize = require('../config/database');

class User extends Model {
  static async isEmailTaken(email) {
    const user = await this.findOne({ where: { email } });
    return !!user;
  }

  async isPasswordMatch(password) {
    return bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      trim: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 100],
        is: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      },
    },
    role: {
      type: DataTypes.ENUM,
      values: roles,
      defaultValue: 'user',
    },
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
    timestamps: true,
    hooks: {
      beforeSave: async (user) => {
        if (user.changed('password')) {
          const newUser = user;
          newUser.password = await bcrypt.hash(newUser.password, 8);
        }
      },
    },
  }
);

User.prototype.toJSON = function () {
  const values = { ...this.get() };
  delete values.createdAt;
  delete values.updatedAt;
  delete values.password;
  delete values.isEmailVerified;
  delete values.role;
  return values;
};

module.exports = User;
