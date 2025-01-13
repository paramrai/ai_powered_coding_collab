import userModel from "../models/user.model.js";
import * as userService from "../services/user.service.js";
import { validationResult } from "express-validator";

export const createUserController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await userService.createUser(req.body);
    const token = await user.generateJWT();
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const loginController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        errors: "Invalid credentials",
      });
    }

    const isPasswordMatch = user.isValidPassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        errors: "Invalid credentials",
      });
    }

    const token = await user.generateJWT();

    return res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

export const profileController = async (req, res) => {
  return res.status(200).json({ user: req.user });
};

export const logoutController = async (req, res) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // redisClient.set(token, "logout", "EX", 60 * 60 * 24);
    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

export const getAllUsersController = async (req, res) => {
  try {
    const loggedInUser = await userModel.findOne({
      email: req.user.email,
    });

    const allUser = await userService.getAllUsers({ userId: loggedInUser._id });

    res.status(200).json({
      allUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};
