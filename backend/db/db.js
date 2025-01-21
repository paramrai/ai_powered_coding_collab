import mongoose from "mongoose";

async function connect() {
  const uri = process.env.MONGO_URI;

  await mongoose
    .connect(uri)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Connection error", err);
    });
}

export default connect;
