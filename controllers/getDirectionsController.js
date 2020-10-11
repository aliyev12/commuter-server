const models = require("../models");
const { getDirections } = require("../utils/fetchRoutesInfo");

async function _getDirections(io, socket, resultsType, routeID, callback) {
  if (resultsType === "complete") {
    try {
      const directions = await models.Direction.findAll({
        attributes: ["directionName", "tripHeadsign", "directionNum"],
        where: { routeID },
      });

      callback(directions);
    } catch (error) {
      callback(error);
    }
  } else if (resultsType === "current") {
    const directions = await getDirections(routeID);
    console.log("###### directions = ", directions);

    const mappedDirections = directions.map((x) => ({
      directionName: x.directionName,
      directionNum: x.directionNum,
      tripHeadsign: x.tripHeadsign,
    }));
    callback(mappedDirections);
  }

  // io.emit("message", "Message for everyone");
}

module.exports = _getDirections;
