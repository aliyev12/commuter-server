const axios = require("axios");

async function realtimeBusInfo(io, socket, callback) {
  // console.log("in realtimeBusInfo and message = ", message);

  // socket.emit("message", "Message for one socket");
  const url = `https://api.wmata.com/NextBusService.svc/json/jPredictions?api_key=${process.env.WMATA_API_KEY}&StopID=1003419`;

  try {
    const response = await axios.get(url);
    callback(response.data);
  } catch (error) {
    callback(error);
  }
  // io.emit("message", "Message for everyone");
}

module.exports = realtimeBusInfo;
