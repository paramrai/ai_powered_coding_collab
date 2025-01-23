import { Router } from "express";
import { body } from "express-validator";
import {
  acceptInviteController,
  createUserController,
  getPotentialInvitesController,
  inviteUserController,
  loginController,
  logoutController,
  profileController,
  rejectInviteController,
} from "../controllers/user.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Email must be a valid email address"),
    body("password")
      .isLength({ min: 3 })
      .withMessage("Password must be at least 3 characters long"),
  ],
  createUserController
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Email must be a valid email address"),
    body("password")
      .isLength({ min: 3 })
      .withMessage("Password must be at least 3 characters long"),
  ],
  loginController
);

router.get("/profile", authUser, profileController);
router.get("/logout", authUser, logoutController);
router.post("/getPotentialInvites", authUser, getPotentialInvitesController);

router.put("/inviteUser", authUser, inviteUserController);
router.put("/acceptInvite", authUser, acceptInviteController);
router.put("/rejectInvite", authUser, rejectInviteController);

const userRoutes = router;
export default userRoutes;
