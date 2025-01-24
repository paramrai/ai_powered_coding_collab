import { Server } from "socket.io";
import handleJoinUser from "./controllers/handleJoinUser.controller.js";
import handleMessage from "./controllers/handleMessage.controller.js";

function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log(`io connecttion made`);

    if (socket) {
      handleJoinUser(socket);
      handleMessage(socket);
    }
  });
}

export default initSocket;
