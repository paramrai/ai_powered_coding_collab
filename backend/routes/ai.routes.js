import { Router } from "express";
import { getResultController } from "../controllers/ai.controller.js";

const router = Router();

router.get("/getResult", getResultController);

let aiRoutes = router;
export default aiRoutes;
