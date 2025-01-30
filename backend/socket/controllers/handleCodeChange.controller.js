export const handleCodeChange = (socket) => {
  socket.on("codeChange", ({ user, file, gem, top, left, content }) => {
    console.log(user.username);

    // Emit to all sockets in the room except the sender
    socket.broadcast
      .to(gem._id)
      .emit("codeChanged", { user, file, gem, top, left, content });

    // Emit to the sender
    socket.emit("codeChanged", { user, file, gem, top, left, content });
  });
};
