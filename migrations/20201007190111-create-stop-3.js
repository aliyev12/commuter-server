"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Stops", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      stopID: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      stopName: {
        type: Sequelize.STRING,
      },
      stopRoutes: {
        type: Sequelize.STRING,
      },
      directionID: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Directions",
          key: "id",
          as: "directionID",
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
    await queryInterface.dropTable("Stops");
  },
};
