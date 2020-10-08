"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Directions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      directionName: {
        type: Sequelize.STRING,
      },
      tripHeadsign: {
        type: Sequelize.STRING,
      },
      directionNum: {
        type: Sequelize.STRING,
      },
      stops: {
        type: Sequelize.JSON,
      },
      routeID: {
        type: Sequelize.STRING,
        onDelete: "CASCADE",
        references: {
          model: "Routes",
          key: "routeID",
          as: "routeID",
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
    await queryInterface.dropTable("Directions");
  },
};
