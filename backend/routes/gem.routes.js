import { Router } from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import { body } from "express-validator";
import {
  collectGemController,
  createGemController,
  deleteGemController,
  getAllGemsController,
  getGemCollectionController,
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

router.get("/readGem/:gemId", readGemController);

router.put("/updateGem/:gemId", updateGemController);

router.delete("/deleteGem/:gemId", deleteGemController);

router.get("/getUserGems/:userId", getUserGemsController);

router.get("/getAllGems", getAllGemsController);

router.put("/collectGem/:gemId", collectGemController);

router.get("/collection/:userId", getGemCollectionController);

const gemRoutes = router;
export default gemRoutes;
