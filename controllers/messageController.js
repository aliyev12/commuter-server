function messageController(io, socket, message) {
  console.log("in messageController and message = ", message);
  socket.emit("message", "Message for one socket");
  io.emit("message", "Message for everyone");
}

module.exports = messageController;
