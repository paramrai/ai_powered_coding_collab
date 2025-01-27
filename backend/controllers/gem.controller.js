import { validationResult } from "express-validator";
import gemModel from "../models/gem.model.js";
import mongoose from "mongoose";
import {
  InternalServerError,
  NotFoundError,
  ValidationError,
} from "../utils/errorClass.js";
import userModel from "../models/user.model.js";

export const createGemController = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ValidationError(errors.array()[0].msg));
  }

  try {
    const { name, description, owner, fileTree } = req.body;

    const gem = await gemModel.create({
      name,
      description,
      owner,
      fileTree,
    });

    return res.status(201).json(gem);
  } catch (error) {
    console.log(error.message);
    return next(new InternalServerError(error.message));
  }
};

export const readGemController = async (req, res, next) => {
  const { gemName } = req.params;

  try {
    const gem = await gemModel
      .findOne({ name: gemName })
      .populate("collaborator");

    if (!gem) {
      return next(new NotFoundError("Gem not found"));
    }
    res.status(200).json(gem);
  } catch (error) {
    console.error(error.message);
    return next(new InternalServerError(error.message));
  }
};

export const updateGemController = async (req, res, next) => {
  const { gemId } = req.params;

  const { name, description, fileTree } = req.body;

  if (!mongoose.Types.ObjectId.isValid(gemId)) {
    return next(new ValidationError("Invalid gem ID"));
  }

  try {
    await gemModel.findByIdAndUpdate(gemId, { name, description, fileTree });
    const updatedGem = await gemModel.findById(gemId);

    if (!updatedGem) {
      return next(new NotFoundError("Gem not found"));
    }

    res.status(200).json(updatedGem);
  } catch (error) {
    console.error(error.message);
    return next(new InternalServerError(error.message));
  }
};

export const deleteGemController = async (req, res, next) => {
  const { gemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(gemId)) {
    return next(new ValidationError("Invalid gem ID"));
  }

  try {
    const deletedGem = await Model.findByIdAndDelete(gemId);
    if (!deletedGem) {
      gem;
      return next(new NotFoundError("Gem not found"));
    }
    res.status(200).json({ msg: "Gem deleted successfully" });
  } catch (error) {
    console.error(error.message);
    return next(new InternalServerError(error.message));
  }
};

export const getUserGemsController = async (req, res, next) => {
  const { userId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return next(new ValidationError("Unauthorized Please login !"));
    }

    const collabGems = await gemModel
      .find({ collaborator: userId })
      .populate("owner collaborator");

    const myGems = await gemModel
      .find({ owner: userId })
      .populate("owner collaborator");

    if (!myGems || !collabGems) {
      return next(new NotFoundError("Gems not Found"));
    }

    const userGems = myGems.concat(collabGems);

    return res.status(200).json(userGems);
  } catch (error) {
    console.error(error.message);
    return next(new InternalServerError(error.message));
  }
};

export const getAllGemsController = async (req, res, next) => {
  const { userId } = req.params;

  try {
    let allGems;

    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
      allGems = await gemModel
        .find({
          owner: { $ne: userId },
        })
        .populate("owner collaborator");
    } else {
      allGems = await gemModel.find().populate("owner collaborator");
    }

    res.status(200).json(allGems);
  } catch (error) {
    console.error(error.message);
    return next(new InternalServerError(error.message));
  }
};

export const collectGemController = async (req, res, next) => {
  try {
    const { gemId } = req.params;
    const { userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(gemId)) {
      return next(new ValidationError("Invalid gem ID"));
    }

    const user = await userModel.findById(userId);
    const gem = await gemModel.findById(gemId);

    if (!gem || !user) {
      return next(new NotFoundError("Gem or user not exist"));
    }

    // Check if the gem already exists in the user's collection
    const isAlreadyExist = user.collection.some((item) => item.equals(gemId));

    if (isAlreadyExist) {
      await user.updateOne({ $pull: { collection: gemId } });
      return res.status(200).json({ msg: "Gem removed successfully" });
    } else {
      await user.updateOne({ $push: { collection: gemId } });
      return res.status(200).json({ msg: "Gem collected successfully" });
    }
  } catch (error) {
    console.error(error.message);
    return next(new InternalServerError(error.message));
  }
};
