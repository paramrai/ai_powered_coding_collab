import express, { urlencoded, json } from "express";
import morgan from "morgan";
import connect from "./db/db.js";
import userRoutes from "./routes/user.routes.js";

const app = express();
connect();

app.use(morgan("dev"));
app.use(json());
app.use(urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/users", userRoutes);
// app.use("/projects", projectRoutes);
// app.use("/ai", aiRoutes);

export default app;
