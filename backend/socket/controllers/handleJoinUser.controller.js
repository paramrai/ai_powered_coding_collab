import userModel from "../../models/user.model.js";

const handleJoinUser = (socket) => {
  socket.on("join", async ({ userId }) => {
    try {
      // Update user's socketId and set them as active
      const user = await userModel
        .findByIdAndUpdate(
          userId,
          {
            socketId: socket.id,
            isActive: true,
          },
          {
            new: true,
          }
        )
        .populate(
          "collection sentInvites.recievers sentInvites.gem recievedInvites.sender  recievedInvites.gem"
        );

      socket.emit("joined", user);
      socket.broadcast.emit("userOnline", user);
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("disconnect", async () => {
    try {
      const user = await userModel.findOneAndUpdate(
        { socketId: socket.id },
        { socketId: null, isActive: false },
        {
          new: true,
        }
      );

      // Emit an event to notify other clients that the user has gone offline
      socket.broadcast.emit("userOffline", user);
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("logged-out", async ({ socketId }) => {
    try {
      const user = await userModel.findOneAndUpdate(
        { socketId: socketId },
        { socketId: null, isActive: false }
      );
      socket.broadcast.emit("userOffline", user);
    } catch (error) {
      console.error(error);
    }
  });
};

export default handleJoinUser;
