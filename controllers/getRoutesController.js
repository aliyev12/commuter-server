const axios = require("axios");
const models = require("../models");
const { getAllRoutesDetails } = require("../utils/fetchRoutesInfo");

// resultsType = complete or current
async function getRoutes(io, socket, resultsType, callback) {
  if (resultsType === "complete") {
    try {
      const routes = await models.Route.findAll({
        attributes: ["routeID", "routeName"],
      });
      callback(routes);
    } catch (error) {
      callback(error);
    }
  } else if (resultsType === "current") {
    try {
      const routesInfo = await getAllRoutesDetails();
      callback(routesInfo);
    } catch (error) {
      callback(error);
    }
  }

  // io.emit("message", "Message for everyone");
}

module.exports = getRoutes;
