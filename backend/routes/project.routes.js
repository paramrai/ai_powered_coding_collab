import { Router } from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import { body } from "express-validator";
import {
  createProjectController,
  deleteProjectController,
  getAllProjectsController,
  getUserProjectsController,
  readProjectController,
  updateProjectController,
} from "../controllers/project.controller.js";
const router = Router();

router.post(
  "/createProject",
  body("owner").isMongoId().withMessage("user id must be a type of mongo ID"),
  authUser,
  createProjectController
);

router.get("/readProject/:id", readProjectController);

router.put("/updateProject/:id", updateProjectController);

router.delete("/deleteProject/:id", deleteProjectController);

router.get("/getUserProjects/:userId", getUserProjectsController);

router.get("/getAllProjects", getAllProjectsController);

const projectRoutes = router;
export default projectRoutes;
