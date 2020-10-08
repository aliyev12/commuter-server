const models = require("../models");
const { sleep } = require("./sleep");

function persistRoutesInfo(routes) {
  console.log("START PERSIST for routes = ", routes);
  routes.forEach(handleRoute);
}

async function handleRoute(route) {
  await sleep(100);
  console.log("");
  console.log("===================================");
  console.log("Handling route " + route.routeID);
  const buildRoute = await models.Route.build({
    routeID: route.routeID,
    routeName: route.routeName,
  });
  await buildRoute.save();

  route.directions.forEach(handleDirection.bind(this, route.routeID));
}

async function handleDirection(routeID, direction) {
  console.log(
    "Handling direction <" + direction.directionName + "> for route " + routeID
  );
  const buildDirection = await models.Direction.build({
    directionName: direction.directionName,
    tripHeadsign: direction.tripHeadsign,
    directionNum: direction.directionNum,
    stops: JSON.stringify(direction.stops),
    routeID,
  });
  await buildDirection.save();

  // direction.stops.forEach(handleStop.bind(this, newDirection.id));

  // const stopsWithDirId = direction.stops.map((s) => ({
  //   ...s,
  //   stopRoutes: s.stopRoutes.join(","),
  //   directionID: newDirection.id,
  // }));

  // await models.Stop.bulkCreate(stopsWithDirId);
}

async function handleStop(directionID, stop) {
  // await sleep(5);
  console.log(
    "Handling stop <" + stop.stopName + "> for dir ID " + directionID
  );
  let buildStop = await models.Stop.build({
    stopID: stop.stopID,
    stopName: stop.stopName,
    stopRoutes: stop.stopRoutes.join(","),
    directionID,
  });
  const newStop = await buildStop.save();
}

exports.persistRoutesInfo = persistRoutesInfo;
