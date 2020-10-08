const axios = require("axios");

async function realtimeBusInfo(io, socket, stopIDs, callback) {
  const buildUrl = (stopID) =>
    `https://api.wmata.com/NextBusService.svc/json/jPredictions?api_key=${process.env.WMATA_API_KEY}&StopID=${stopID}`;

  try {
    const requests = stopIDs.map((id) => axios.get(buildUrl(id)));

    const response = await axios
      .all(requests)
      .then(axios.spread((...responses) => responses.map((r) => r.data)));

    callback(response);
  } catch (error) {
    callback(error);
  }
  // io.emit("message", "Message for everyone");
}

module.exports = realtimeBusInfo;
