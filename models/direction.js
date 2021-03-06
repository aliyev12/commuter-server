"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Direction extends Model {
    static associate(models) {
      Direction.belongsTo(models.Route, {
        foreignKey: "routeID",
        onDelete: "CASCADE",
      });
    }
  }
  Direction.init(
    {
      directionName: DataTypes.STRING,
      tripHeadsign: DataTypes.STRING,
      directionNum: DataTypes.STRING,
      stops: DataTypes.JSON,
      routeID: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Direction",
    }
  );
  return Direction;
};
