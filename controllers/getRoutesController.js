const axios = require("axios");
const models = require("../models");

async function getRoutes(io, socket, callback) {
  try {
    const routes = await models.Route.findAll({
      attributes: ["routeID", "routeName"],
    });

    callback(routes);
  } catch (error) {
    callback(error);
  }
  // io.emit("message", "Message for everyone");
}

module.exports = getRoutes;
