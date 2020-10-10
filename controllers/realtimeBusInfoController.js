const axios = require("axios");
const uniqid = require("uniqid");

async function realtimeBusInfo(io, socket, bussesToTrack, callback) {
  const buildUrl = (stopID) =>
    `https://api.wmata.com/NextBusService.svc/json/jPredictions?api_key=${process.env.WMATA_API_KEY}&StopID=${stopID}`;

  try {
    const requests = bussesToTrack.map((x) => axios.get(buildUrl(x.stopID)));

    const response = await axios.all(requests).then(
      axios.spread((...responses) =>
        responses.map((r, i) => {
          return {
            id: uniqid(),
            predictions: r.data,
            trackedBusInfo: bussesToTrack[i],
          };
        })
      )
    );
    // socket.emit("bussesToTrackInfo", response);
    callback(response);
  } catch (error) {
    callback(error);
  }
  // console.log("socket.id = ", socket.id);
  // setInterval(() => {
  //   console.log("socket.connected = ", socket.connected);
  // }, 1000);
  // io.emit("message", "Message for everyone");
}

module.exports = realtimeBusInfo;
