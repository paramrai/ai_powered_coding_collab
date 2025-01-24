function handleMessage(socket) {
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  socket.on("send-message", ({ msg, gem }) => {
    socket.to(gem._id).emit("new-message", msg);
  });
}

export default handleMessage;
