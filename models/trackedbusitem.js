"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TrackedBusItem extends Model {
    static associate(models) {
      TrackedBusItem.belongsTo(models.User, {
        foreignKey: "userID",
        onDelete: "CASCADE",
      });
    }
  }
  TrackedBusItem.init(
    {
      id: { type: DataTypes.STRING, primaryKey: true },
      routeID: DataTypes.STRING,
      directionNum: DataTypes.STRING,
      directionName: DataTypes.STRING,
      stopID: DataTypes.STRING,
      routeName: DataTypes.STRING,
      stopName: DataTypes.STRING,
      stopRoutes: DataTypes.STRING,
      tripHeadsign: DataTypes.STRING,
      userID: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "TrackedBusItem",
    }
  );
  return TrackedBusItem;
};
