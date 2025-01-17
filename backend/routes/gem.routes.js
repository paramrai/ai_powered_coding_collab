import { Router } from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import { body } from "express-validator";
import {
  createGemController,
  deleteGemController,
  getAllGemsController,
  getUserGemsController,
  readGemController,
  updateGemController,
} from "../controllers/Gem.controller.js";
const router = Router();

router.post(
  "/createGem",
  body("owner").isMongoId().withMessage("user id must be a type of mongo ID"),
  authUser,
  createGemController
);

router.get("/readGem/:id", readGemController);

router.put("/updateGem/:id", updateGemController);

router.delete("/deleteGem/:id", deleteGemController);

router.get("/getUserGems/:userId", getUserGemsController);

router.get("/getAllGems", getAllGemsController);

const gemRoutes = router;
export default gemRoutes;
