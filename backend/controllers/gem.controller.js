import { validationResult } from "express-validator";
import gemModel from "../models/gem.model.js";
import mongoose from "mongoose";
import {
  InternalServerError,
  NotFoundError,
  ValidationError,
} from "../utils/errorClass.js";

export const createGemController = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ValidationError(errors.array()[0].msg));
  }

  try {
    const { name, description, owner } = req.body;

    const gem = await gemModel.create({
      name,
      description,
      owner,
    });

    return res.status(201).json(gem);
  } catch (error) {
    console.log(error.message);
    return next(new InternalServerError(error.message));
  }
};

export const readGemController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const gem = await gemModel.findById(id);
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
  const { id } = req.params;
  const { name, description, ...otherFields } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ValidationError("Invalid gem ID"));
  }
  try {
    const updatedGem = await gemModel.findByIdAndUpdate(
      id,
      { name, description, ...otherFields },
      { new: true, runValidators: true }
    );
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
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ValidationError("Invalid gem ID"));
  }
  try {
    const deletedGem = await Model.findByIdAndDelete(id);
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
      return next(new ValidationError("Invalid user ID"));
    }

    const userGems = await gemModel.find({ owner: userId });

    if (!userGems) {
      return res.status(200).json({ msg: "Not found" });
    }

    return res.status(200).json(userGems);
  } catch (error) {
    console.error(error.message);
    return next(new InternalServerError(error.message));
  }
};

export const getAllGemsController = async (req, res, next) => {
  try {
    const allGems = await gemModel.find();
    res.status(200).json(allGems);
  } catch (error) {
    console.error(error.message);
    return next(new InternalServerError(error.message));
  }
};
