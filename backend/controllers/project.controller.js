import { validationResult } from "express-validator";
import projectModel from "../models/project.model.js";
import mongoose from "mongoose";
import {
  InternalServerError,
  NotFoundError,
  ValidationError,
} from "../utils/errorClass.js";

export const createProjectController = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ValidationError(errors.array()[0].msg));
  }

  try {
    const { name, description, owner } = req.body;

    const project = await projectModel.create({
      name,
      description,
      owner,
    });

    return res.status(201).json(project);
  } catch (error) {
    console.log(error.message);
    return next(new InternalServerError(error.message));
  }
};

export const readProjectController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const project = await projectModel.findById(id);
    if (!project) {
      return next(new NotFoundError("Project not found"));
    }
    res.status(200).json(project);
  } catch (error) {
    console.error(error.message);
    return next(new InternalServerError(error.message));
  }
};

export const updateProjectController = async (req, res, next) => {
  const { id } = req.params;
  const { name, description, ...otherFields } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ValidationError("Invalid project ID"));
  }
  try {
    const updatedProject = await projectModel.findByIdAndUpdate(
      id,
      { name, description, ...otherFields },
      { new: true, runValidators: true }
    );
    if (!updatedProject) {
      return next(new NotFoundError("Project not found"));
    }
    res.status(200).json(updatedProject);
  } catch (error) {
    console.error(error.message);
    return next(new InternalServerError(error.message));
  }
};

export const deleteProjectController = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ValidationError("Invalid project ID"));
  }
  try {
    const deletedProject = await projectModel.findByIdAndDelete(id);
    if (!deletedProject) {
      return next(new NotFoundError("Project not found"));
    }
    res.status(200).json({ msg: "Project deleted successfully" });
  } catch (error) {
    console.error(error.message);
    return next(new InternalServerError(error.message));
  }
};

export const getUserProjectsController = async (req, res, next) => {
  const { userId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return next(new ValidationError("Invalid user ID"));
    }

    const userProjects = await projectModel.find({ owner: userId });

    if (!userProjects) {
      return res.status(200).json({ msg: "Not found" });
    }

    return res.status(200).json(userProjects);
  } catch (error) {
    console.error(error.message);
    return next(new InternalServerError(error.message));
  }
};

export const getAllProjectsController = async (req, res, next) => {
  try {
    const allProjects = await projectModel.find();
    res.status(200).json(allProjects);
  } catch (error) {
    console.error(error.message);
    return next(new InternalServerError(error.message));
  }
};
