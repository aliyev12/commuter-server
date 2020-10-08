"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Route extends Model {
    static associate(models) {
      Route.hasMany(models.Direction, {
        foreignKey: "routeID",
      });
    }
  }
  Route.init(
    {
      routeID: DataTypes.STRING,
      routeName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Route",
    }
  );
  return Route;
};
