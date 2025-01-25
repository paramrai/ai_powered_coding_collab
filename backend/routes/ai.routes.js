import { Router } from "express";
import { getResultController } from "../controllers/ai.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/getResult", authUser, getResultController);

let aiRoutes = router;
export default aiRoutes;
