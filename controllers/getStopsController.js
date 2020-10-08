const models = require("../models");

async function getStops(io, socket, routeID, directionNum, callback) {
  //  id  | directionName |   tripHeadsign  | directionNum | routeID
  try {
    const directions = await models.Direction.findAll({
      attributes: ["stops"],
      where: { routeID, directionNum },
      limit: 1,
    });
    if (directions && directions.length && directions[0].stops) {
      callback(JSON.parse(directions[0].stops));
    } else {
      callback({
        error:
          "No directions with specified routeID and/or directionNum were found",
      });
    }
  } catch (error) {
    callback({ error });
  }
  // io.emit("message", "Message for everyone");
}

module.exports = getStops;
