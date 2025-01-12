import { Server } from "socket.io";

let io;

function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Socket is connected id: ${socket.id}`);

    // Error handling for socket
    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });

    socket.on("disconnect", (reason) => {
      console.log(`Socket disconnected due to: ${reason}`);
    });
  });

  io.on("error", (error) => {
    console.error("IO error:", error);
  });
}

export default initSocket;
