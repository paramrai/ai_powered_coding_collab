import userModel from "../models/user.model.js";
import * as userService from "../services/user.service.js";
import { validationResult } from "express-validator";
import {
  AuthenticationError,
  DuplicateKeyError,
  ValidationError,
} from "../utils/errorClass.js";
import gemModel from "../models/gem.model.js";

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
      .populate(
        "collection sentInvites.recievers sentInvites.gem recievedInvites.sender  recievedInvites.gem"
      );

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

export const getPotentialInvitesController = async (req, res, next) => {
  const { gemId } = req.body;

  try {
    const loggedInUser = await userModel.findOne({
      email: req.user.email,
    });
    const gem = await gemModel.findById(gemId);
    const sentInvite = loggedInUser.sentInvites.find(
      (invite) => String(invite.gem) === String(gemId)
    );

    console.log({ sentInvite });

    const allUser = await userModel.find({ _id: { $ne: loggedInUser._id } });

    const potentialInvites = allUser.filter(
      (user) =>
        !sentInvite?.recievers.includes(user._id) &&
        !gem.collaborator.includes(user._id)
    );

    res.status(200).json({
      potentialInvites,
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
        invite.gem.equals(gemId) && invite.sender.equals(inviteSenderId)
    );

    console.log("hasRecievedInvites", hasReceivedInvite);

    if (hasReceivedInvite) {
      // Remove the invite
      await inviteReceiverUser.updateOne({
        $pull: {
          recievedInvites: {
            sender: inviteSenderId,
            gem: gemId,
          },
        },
      });

      // Remove receiverId from sender's sentInvites
      const gemInviteIndex = inviteSenderUser.sentInvites.findIndex(
        (invite) => invite.gem.toString() === gemId.toString()
      );

      if (gemInviteIndex !== -1) {
        inviteSenderUser.sentInvites[gemInviteIndex].recievers =
          inviteSenderUser.sentInvites[gemInviteIndex].recievers.filter(
            (id) => id.toString() !== inviteReceiverId.toString()
          );

        // Remove the entire gemId object if no receivers left
        if (
          inviteSenderUser.sentInvites[gemInviteIndex].recievers.length === 0
        ) {
          inviteSenderUser.sentInvites.splice(gemInviteIndex, 1);
        }
      }
    } else {
      // Add new invite
      await inviteReceiverUser.updateOne({
        $push: {
          recievedInvites: {
            sender: inviteSenderId,
            gem: gemId,
          },
        },
      });

      // Update sender's sentInvites
      const existingGemInvite = inviteSenderUser.sentInvites.find(
        (invite) => invite.gem.toString() === gemId.toString()
      );

      if (existingGemInvite) {
        // Add receiverId if it doesn't exist
        if (!existingGemInvite.recievers.includes(inviteReceiverId)) {
          existingGemInvite.recievers.push(inviteReceiverId);
        }
      } else {
        // Create new gemId object with receiverId
        inviteSenderUser.sentInvites.push({
          recievers: [inviteReceiverId],
          gem: gemId,
        });
      }
    }

    await inviteSenderUser.save();

    // Populate and return updated user
    const updatedUser = await userModel
      .findById(inviteSenderId)
      .populate(
        "sentInvites.recievers sentInvites.gem recievedInvites.sender  recievedInvites.gem"
      );

    return res.status(200).json({
      msg: hasReceivedInvite ? "Invite removed" : "Invite sent",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return next(new Error(error.message));
  }
};

export const acceptInviteController = async (req, res, next) => {
  const { gemId, accepterId, senderId } = req.body;

  console.log({ gemId });
  console.log({ senderId });
  console.log({ accepterId });

  try {
    const gem = await gemModel.findById(gemId);
    const accepterUser = await userModel.findById(accepterId);
    const senderUser = await userModel.findById(senderId);

    if (!gem || !accepterUser || !senderUser) {
      return next(new ValidationError("Please enter a valid user or gem Id"));
    }

    // Remove the invite from accepter's recievedInvites
    await accepterUser.updateOne({
      $pull: {
        recievedInvites: {
          gem: gemId,
          sender: senderId,
        },
      },
    });

    // Remove the invite from sender's sentInvites
    const inviteIndex = senderUser.sentInvites.findIndex((invite) =>
      invite.gem.equals(gemId)
    );

    if (inviteIndex !== -1) {
      // Filter out the specific receiverId from recievers
      senderUser.sentInvites[inviteIndex].recievers = senderUser.sentInvites[
        inviteIndex
      ].recievers.filter((id) => id.toString() !== accepterId.toString());

      // Check if recievers is now empty, remove the invite if so
      if (senderUser.sentInvites[inviteIndex].recievers.length === 0) {
        senderUser.sentInvites.splice(inviteIndex, 1);
      }

      await senderUser.save();
    }

    // Add accepter Id to gem's collaborators
    if (!gem.collaborator.includes(accepterId)) {
      gem.collaborator.push(accepterId);
    }

    await gem.save();

    // Populate and return updated user
    const updatedUser = await userModel
      .findById(accepterId)
      .populate(
        "sentInvites.recievers sentInvites.gem  recievedInvites.sender  recievedInvites.gem"
      );

    return res.status(200).json({
      msg: "Invite accepted",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return next(new Error(error.message));
  }
};

export const rejectInviteController = async (req, res, next) => {
  const { gemId, rejectorId, senderId } = req.body;

  console.log({ gemId });
  console.log({ rejectorId });
  console.log({ senderId });

  try {
    const rejectorUser = await userModel.findById(rejectorId);
    const senderUser = await userModel.findById(senderId);
    const gem = await gemModel.findById(gemId);

    if (!rejectorUser || !senderUser || !gem) {
      return next(new ValidationError("Please enter a valid user or gem Id"));
    }

    // Remove the invite from rejector's recievedInvites
    await rejectorUser.updateOne({
      $pull: {
        recievedInvites: {
          gem: gemId,
          sender: senderId,
        },
      },
    });

    // Remove the invite from sender's sentInvites
    const inviteIndex = senderUser.sentInvites.findIndex((invite) =>
      invite.gem.equals(gemId)
    );

    console.log({ inviteIndex });

    if (inviteIndex !== -1) {
      senderUser.sentInvites[inviteIndex].recievers = senderUser.sentInvites[
        inviteIndex
      ].recievers.filter((id) => id.toString() !== rejectorId.toString());

      if (!senderUser.sentInvites[inviteIndex].recievers.length) {
        senderUser.sentInvites.splice(inviteIndex, 1);
      }

      await senderUser.save();
    }

    // Populate and return updated user
    const updatedUser = await userModel
      .findById(rejectorId)
      .populate(
        "sentInvites.recievers sentInvites.gem  recievedInvites.sender  recievedInvites.gem"
      );

    return res.status(200).json({
      msg: "Invite rejected",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return next(new Error(error.message));
  }
};
