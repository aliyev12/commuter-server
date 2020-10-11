"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("TrackedBusItems", {
      id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: Sequelize.STRING,
      },
      routeID: {
        type: Sequelize.STRING,
      },
      directionNum: {
        type: Sequelize.STRING,
      },
      directionName: {
        type: Sequelize.STRING,
      },
      stopID: {
        type: Sequelize.STRING,
      },
      routeName: {
        type: Sequelize.STRING,
      },
      stopName: {
        type: Sequelize.STRING,
      },
      stopRoutes: {
        type: Sequelize.STRING,
      },
      tripHeadsign: {
        type: Sequelize.STRING,
      },
      userID: {
        type: Sequelize.UUID,
        onDelete: "CASCADE",
        references: {
          model: "Users",
          key: "id",
          as: "userID",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("TrackedBusItems");
  },
};
