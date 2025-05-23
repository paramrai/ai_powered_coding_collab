import express, { urlencoded, json } from "express";
import morgan from "morgan";
import connect from "./db/db.js";
import userRoutes from "./routes/user.routes.js";
import cors from "cors";
import errorHandler from "./utils/errorHandler.js";
import aiRoutes from "./routes/ai.routes.js";
import gemRoutes from "./routes/gem.routes.js";

const app = express();
connect();

app.use(
  cors({
    origin: "*",
  })
);
app.use(morgan("dev"));
app.use(json());
app.use(urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/users", userRoutes);
app.use("/gems", gemRoutes);
app.use("/ai", aiRoutes);
app.use(errorHandler);

export default app;
