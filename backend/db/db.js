import mongoose from "mongoose";

function connect() {
  const uri = process.env.MONGO_URI;

  mongoose
    .connect(uri)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Connection error", err);
    });
}

export default connect;
