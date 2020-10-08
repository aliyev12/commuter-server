const messageController = require("./messageController");
const disconnectController = require("./disconnectController");
const realtimeBusInfoController = require("./realtimeBusInfoController");
const getRoutesController = require("./getRoutesController");
const getDirectionsController = require("./getDirectionsController");
const updateRoutesInfoController = require("./updateRoutesInfoController");
const usersController = require("./usersController");

exports.message = messageController;
exports.disconnect = disconnectController;
exports.realtimeBusInfo = realtimeBusInfoController;
exports.getRoutes = getRoutesController;
exports.getDirections = getDirectionsController;
exports.updateRoutesInfo = updateRoutesInfoController;
exports.usersController = usersController;
