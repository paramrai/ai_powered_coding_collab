import { Router } from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import { body } from "express-validator";
import {
  collectGemController,
  createGemController,
  deleteGemController,
  getAllGemsController,
  getUserGemsController,
  readGemController,
  updateGemController,
} from "../controllers/gem.controller.js";
const router = Router();

router.post(
  "/createGem",
  body("owner").isMongoId().withMessage("user id must be a type of mongo ID"),
  authUser,
  createGemController
);

router.get("/readGem/:gemName", readGemController); // done

router.put("/updateGem/:gemId", updateGemController); // done

router.delete("/deleteGem/:gemId", deleteGemController);

router.get("/getUserGems/:userId", getUserGemsController); // done

router.get("/getAllGems/:userId", getAllGemsController); // done

router.put("/collectGem/:gemId", collectGemController); // done

const gemRoutes = router;
export default gemRoutes;
