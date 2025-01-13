import { validationResult } from "express-validator";
import projectModel from "../models/project.model.js";
import mongoose from "mongoose";

export const createProjectController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
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
    return res.status(400).json(error.message);
  }
};

export const readProjectController = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await projectModel.findById(id);
    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error);
  }
};

export const updateProjectController = async (req, res) => {
  const { id } = req.params;
  const { name, description, ...otherFields } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "Invalid project ID" });
  }
  try {
    const updatedProject = await projectModel.findByIdAndUpdate(
      id,
      { name, description, ...otherFields },
      { new: true, runValidators: true }
    );
    if (!updatedProject) {
      return res.status(404).json({ msg: "Project not found" });
    }
    res.status(200).json(updatedProject);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error);
  }
};

export const deleteProjectController = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "Invalid project ID" });
  }
  try {
    const deletedProject = await projectModel.findByIdAndDelete(id);
    if (!deletedProject) {
      return res.status(404).json({ msg: "Project not found" });
    }
    res.status(200).json({ msg: "Project deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error);
  }
};

export const getUserProjectsController = async (req, res) => {
  const { userId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    }

    const userProjects = await projectModel.find({ owner: userId });

    if (!userProjects) {
      return res.status(200).json({ msg: "Not found" });
    }

    return res.status(404).json(userProjects);
  } catch (error) {}
};

export const getAllProjectsController = async (req, res) => {
  try {
    const allProjects = await projectModel.find();
    res.status(200).json(allProjects);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error);
  }
};
