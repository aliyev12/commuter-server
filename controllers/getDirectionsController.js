const models = require("../models");

async function getDirections(io, socket, routeID, callback) {
  //  id  | directionName |   tripHeadsign  | directionNum | routeID
  try {
    const directions = await models.Direction.findAll({
      attributes: ["directionName", "tripHeadsign", "directionNum"],
      where: { routeID },
    });

    callback(directions);
  } catch (error) {
    callback(error);
  }
  // io.emit("message", "Message for everyone");
}

module.exports = getDirections;
