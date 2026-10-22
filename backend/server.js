import "dotenv/config";
import app from "./app.js";
import http from "http";
import initSocket from "./socket/socket.js";

// Env Var Sanity Check
const requiredEnvVars = ["MONGO_URI", "JWT_SECRET", "GOOGLE_AI_KEY"];
console.log("\n--- Environment Variable Check ---");
requiredEnvVars.forEach((varName) => {
  if (process.env[varName]) {
    console.log(`✅ ${varName}: Loaded`);
  } else {
    console.log(`❌ ${varName}: MISSING`);
  }
});
console.log("--------------------------------\n");

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

initSocket(server);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

server.on("error", (error) => {
  console.error("Server error:", error);
});
