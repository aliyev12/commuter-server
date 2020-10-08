"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // return queryInterface.bulkInsert(
    //   "Stops",
    //   [
    //     {
    //       stopID: "001001",
    //       stopName: "Burke Lake Rd + Wall St",
    //       stopRoutes: "17H,17K,17L",
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     },
    //   ],
    //   {}
    // );
  },

  down: async (queryInterface, Sequelize) => {
    // await queryInterface.bulkDelete("Stops", null, {});
  },
};
