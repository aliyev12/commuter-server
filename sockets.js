const controllers = require("./controllers");

const channels = [
  "message",
  "disconnect",
  "realtimeBusInfo",
  "getRoutes",
  "getDirections",
];

const setupListeners = (io, socket) => {
  channels.forEach((channel) => {
    socket.on(channel, controllers[channel].bind(this, io, socket));
  });
};

exports.setupListeners = setupListeners;
exports.channels = channels;
