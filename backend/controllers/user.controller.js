import userModel from "../models/user.model.js";
import * as userService from "../services/user.service.js";
import { validationResult } from "express-validator";
import {
  AuthenticationError,
  DuplicateKeyError,
  ValidationError,
} from "../utils/errorClass.js";

export const createUserController = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new ValidationError(errors.array()[0].msg));
  }

  try {
    const user = await userService.createUser(req.body);
    const token = await user.generateJWT();
    res.status(201).json({ user, token });
  } catch (error) {
    if (error.code === 11000) {
      next(new DuplicateKeyError("Email already exists"));
    } else {
      next(new Error(error.message));
    }
  }
};

export const loginController = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new ValidationError(errors.array()[0].msg));
  }
  const { email, password } = req.body;

  try {
    const user = await userModel
      .findOne({ email })
      .select("+password")
      .populate("collection");

    if (!user) {
      return next(new AuthenticationError("Invalid credentials"));
    }

    const isPasswordMatch = await user.isValidPassword(password);

    if (!isPasswordMatch) {
      return next(new AuthenticationError("Invalid credentials"));
    }

    const token = await user.generateJWT();

    return res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
    return next(new Error(error.message));
  }
};

export const profileController = async (req, res) => {
  return res.status(200).json({ user: req.user });
};

export const logoutController = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return next(new AuthenticationError("Unauthorised please login !"));
    }

    const token = authHeader.split(" ")[1];

    // redisClient.set(token, "logout", "EX", 60 * 60 * 24);
    res.status(200).json({
      msg: "Logged out successfully",
    });
  } catch (error) {
    console.log(error);
    return next(new Error(error.message));
  }
};

export const getAllUsersController = async (req, res, next) => {
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
    return next(new Error(error.message));
  }
};
