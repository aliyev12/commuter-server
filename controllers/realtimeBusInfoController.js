const axios = require("axios");

/*
  socket.id =  ysaC4G4Vyo5Nama2AAAF
  socket.id =  OZ1mr3ZY-W-Q-qMdAAAH
*/

async function realtimeBusInfo(io, socket, bussesToTrack, callback) {
  const buildUrl = (stopID) =>
    `https://api.wmata.com/NextBusService.svc/json/jPredictions?api_key=${process.env.WMATA_API_KEY}&StopID=${stopID}`;

  try {
    const requests = bussesToTrack.map((x) => axios.get(buildUrl(x.stopID)));

    const response = await axios.all(requests).then(
      axios.spread((...responses) =>
        responses.map((r, i) => ({
          predictions: r.data,
          trackedBusInfo: bussesToTrack[i],
        }))
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
