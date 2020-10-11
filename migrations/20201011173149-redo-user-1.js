("use strict");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        max: 1,
        min: 200,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        isEmail: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      roles: {
        type: Sequelize.STRING,
      },
      preferences: {
        type: Sequelize.JSON,
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
    await queryInterface.dropTable("Users");
  },
};
