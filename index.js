const app = require("./app");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const { setupListeners } = require("./sockets");
require("dotenv").config();

const PORT = process.env.PORT || "3333";

io.on("connection", function (socket) {
  console.log("New user connection");
  setupListeners(io, socket);
});

http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

http.on("error", (error) => {
  if (error.syscall !== "listen") throw error;
  switch (error.code) {
    case "EACCES":
      process.exit(1);
      break;
    case "EADDRINUSE":
      process.exit(1);
      break;
    default:
      throw error;
  }
});

http.on("close", () => {
  console.log("Server closed");
});

http.on("SIGINT", () => {
  http.close();
});
