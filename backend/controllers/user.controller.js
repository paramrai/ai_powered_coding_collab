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

export const inviteUserController = async (req, res, next) => {
  const { inviteSenderId, inviteReceiverId, gemId } = req.body;

  try {
    const [inviteReceiverUser, inviteSenderUser] = await Promise.all([
      userModel.findById(inviteReceiverId),
      userModel.findById(inviteSenderId),
    ]);

    if (!inviteSenderUser || !inviteReceiverUser || !gemId) {
      return next(new ValidationError("Please enter a valid user or gem Id"));
    }

    // Check if receiver already has this invite
    const hasReceivedInvite = inviteReceiverUser.recievedInvites.some(
      (invite) =>
        invite.gemId.toString() === gemId.toString() &&
        invite.senderId.toString() === inviteSenderId.toString()
    );

    if (hasReceivedInvite) {
      // Remove the invite
      await inviteReceiverUser.updateOne({
        $pull: {
          recievedInvites: {
            gemId: gemId,
            senderId: inviteSenderId,
          },
        },
      });

      await inviteSenderUser.updateOne({});

      // Remove receiverId from sender's sentInvites
      const gemInviteIndex = inviteSenderUser.sentInvites.findIndex(
        (invite) => invite.gemId.toString() === gemId.toString()
      );

      if (gemInviteIndex !== -1) {
        inviteSenderUser.sentInvites[gemInviteIndex].recieverIds =
          inviteSenderUser.sentInvites[gemInviteIndex].recieverIds.filter(
            (id) => id.toString() !== inviteReceiverId.toString()
          );

        // Remove the entire gemId object if no receivers left
        if (
          inviteSenderUser.sentInvites[gemInviteIndex].recieverIds.length === 0
        ) {
          inviteSenderUser.sentInvites.splice(gemInviteIndex, 1);
        }
      }
    } else {
      // Add new invite
      await inviteReceiverUser.updateOne({
        $push: {
          recievedInvites: {
            senderId: inviteSenderId,
            gemId,
          },
        },
      });

      // Update sender's sentInvites
      const existingGemInvite = inviteSenderUser.sentInvites.find(
        (invite) => invite.gemId.toString() === gemId.toString()
      );

      if (existingGemInvite) {
        // Add receiverId if it doesn't exist
        if (!existingGemInvite.recieverIds.includes(inviteReceiverId)) {
          existingGemInvite.recieverIds.push(inviteReceiverId);
        }
      } else {
        // Create new gemId object with receiverId
        inviteSenderUser.sentInvites.push({
          recieverIds: [inviteReceiverId],
          gemId,
        });
      }
    }

    await inviteSenderUser.save();

    // Populate and return updated user
    const updatedUser = await userModel.findById(inviteSenderId);

    return res.status(200).json({
      msg: hasReceivedInvite ? "Invite removed" : "Invite sent",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return next(new Error(error.message));
  }
};
