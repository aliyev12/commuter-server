const axios = require("axios");
const fs = require("fs");
const models = require("../models");
const { sleep } = require("./sleep");
const { persistRoutesInfo } = require("./persistRoutesInfo");

/**
 * Enum string values.
 * @enum {string}
 */
Enumeration = {
  api: "api",
  json: "json",
};

/**
 * fetchFrom can be either "api" or "json"
 * If it is "api", then the data will be requested from WMATA API endpoint.
 * If it is "json", then the data will come from routes.json file.
 * @param {Enumeration} fetchFrom one of the enumeration values.
 */
async function fetchRoutesInfo(fetchFrom = Enumeration.api) {
  destroyAllExistingRoutesInfo();
  let routes = [];
  if (fetchFrom === Enumeration.api) {
    const routesInfo = await getAllRoutesDetails();
    if (routesInfo && routesInfo.length) {
      routes = await fetchPaths(routesInfo);
    }
  } else {
    const rawRoutesData = fs.readFileSync("routes.json");
    routes = JSON.parse(rawRoutesData);
  }
  persistRoutesInfo(routes);
}

async function getAllRoutesDetails() {
  const routesUrl = `${process.env.WMATA_BASE_URL}/Bus.svc/json/jRoutes?api_key=${process.env.WMATA_API_KEY}`;
  const routesInfo = [];

  try {
    const routesResponse = await axios.get(routesUrl);
    if (
      routesResponse &&
      routesResponse.data &&
      routesResponse.data.Routes &&
      routesResponse.data.Routes.length &&
      Array.isArray(routesResponse.data.Routes)
    ) {
      const routes = routesResponse.data.Routes;

      routes.forEach(({ RouteID, Name, LineDescription }) => {
        if (RouteID && Name) {
          const newRouteInfoItem = {
            routeID: RouteID,
            routeName: Name,
          };
          routesInfo.push(newRouteInfoItem);
        }
      });
    }
  } catch (error) {
    console.log("Error = ", error);
  }
  return routesInfo;
}

async function fetchPaths(routesInfo) {
  const fullRoutes = [];

  for (const item of routesInfo) {
    await sleep(100);
    const { routeID, routeName } = item;
    const newRouteInfoItem = {
      routeID,
      routeName,
      directions: [],
    };
    console.log(`Fetching path "${routeName}"" with ID ${routeID}...`);

    const pathDetailUrl = `${process.env.WMATA_BASE_URL}/Bus.svc/json/jRouteDetails?api_key=${process.env.WMATA_API_KEY}&RouteID=${routeID}`;
    try {
      const pathDetailResponse = await axios.get(pathDetailUrl);
      if (pathDetailResponse && pathDetailResponse.data) {
        const pathDetailData = pathDetailResponse.data;

        Object.keys(pathDetailData).forEach((key) => {
          if (
            pathDetailData[key] &&
            (key === "Direction0" || key === "Direction1")
          ) {
            const {
              TripHeadsign,
              DirectionText,
              DirectionNum,
              Stops,
            } = pathDetailData[key];
            if (
              TripHeadsign &&
              DirectionText &&
              DirectionNum &&
              Stops &&
              Stops.length &&
              Array.isArray(Stops)
            ) {
              const newDirection = {
                directionName: DirectionText,
                tripHeadsign: TripHeadsign,
                directionNum: DirectionNum,
                stops: [
                  ...Stops.map((stop) => ({
                    stopID: stop.StopID,
                    stopName: stop.Name,
                    stopRoutes: stop.Routes,
                  })),
                ],
              };
              newRouteInfoItem.directions.push(newDirection);
            }
          }
        });

        fullRoutes.push(newRouteInfoItem);
      }
    } catch (error) {
      console.log("Error = ", error);
    }
  }

  return fullRoutes;
}

async function destroyAllExistingRoutesInfo() {
  await models.Route.destroy({
    where: {},
  });
  await models.Direction.destroy({
    where: {},
  });
  await models.Stop.destroy({
    where: {},
  });
}

exports.fetchRoutesInfo = fetchRoutesInfo;
