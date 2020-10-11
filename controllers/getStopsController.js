const models = require("../models");
const { getDirections } = require("../utils/fetchRoutesInfo");

async function getStops(
  io,
  socket,
  resultsType,
  routeID,
  directionNum,
  callback
) {
  if (resultsType === "complete") {
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
  } else if (resultsType === "current") {
    const directions = await getDirections(routeID);

    const mappedDirections = directions
      .filter((x) => x.directionNum === directionNum)
      .map((x) => x.stops);

    callback(mappedDirections[0]);
  }
}

module.exports = getStops;
