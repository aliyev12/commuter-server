"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Stop extends Model {
    static associate(models) {
      Stop.belongsTo(models.Direction, {
        foreignKey: "directionID",
        onDelete: "CASCADE",
      });
    }
  }
  Stop.init(
    {
      stopID: DataTypes.STRING,
      stopName: DataTypes.STRING,
      stopRoutes: DataTypes.STRING,
      directionID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Stop",
    }
  );
  return Stop;
};
