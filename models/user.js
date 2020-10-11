const uuid = require("uuid");

("use strict");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.TrackedBusItem, {
        foreignKey: "userID",
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      roles: DataTypes.STRING,
      preferences: DataTypes.JSON,
    },
    {
      hooks: {
        beforeValidate: (user, options) => {
          user.id = uuid.v4();
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
