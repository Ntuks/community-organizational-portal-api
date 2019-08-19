import { verify } from 'jsonwebtoken';
import { Types } from 'mongoose';
import models from '../models/index';

const createProject = async (req, res) => {
  try {
    // check if the token of the user allows them to create a project.
    const { user } = req;
    const org = await models.Organization.findOne({ orgManager: { _id: user.orgManager._id } }).select(
      '_id status orgManager'
    );
    if (org.status === 'INACTIVE') {
      res.send({
        message: 'Not allowed to project. Account not yet activated.',
      });
      return;
    }

    // check if the user is trying to edit fields they are not supposed to.
    const args = req.body;
    if (args.orgManager != null || args.organization != null) {
      res.send({
        message: 'Not allowed to edit organization manager and organization.',
      });
      return;
    }

    const { title, description, duration, poster } = args;

    // check if this project already exists
    let project = await models.Project.findOne({ title }).select('-__v');
    if (project) {
      res.send({ message: 'Project already exists.' });
      return;
    }

    // create and save new project
    project = new models.Project({
      _id: Types.ObjectId(),
      title,
      description,
      duration,
      poster,
      organization: org._id,
      orgManager: org.orgManager._id,
    });
    try {
      await project.save();
      res.send(project);
    } catch (error) {
      res.send({
        message: error.message.substring(error.message.lastIndexOf(':') + 2),
      });
      return;
    }

    await models.OrgManager.findOneAndUpdate(
      { _id: { _id: org.orgManager._id } },
      {
        $push: {
          projects: project,
        },
      },
      { new: true }
    );

    await models.Organization.findOneAndUpdate(
      { _id: org._id },
      {
        $push: {
          projects: project,
        },
      },
      { new: true }
    );
  } catch (error) {
    res.send({ message: error.message });
  }
};

const getProject = async (req, res) => {
  try {
    // check if the token of the user allows them to create a project.
    const { user } = req;
    const org = await models.Organization.findOne({ orgManager: { _id: user.orgManager._id } }).select(
      '_id status orgManager'
    );
    if (org.status === 'INACTIVE') {
      res.send({
        message: 'Not allowed to project. Account not yet activated.',
      });
      return;
    }

    const { projectId } = req.params;
    const project = await models.Project.findOne({ _id: projectId }).select('-__v');

    res.send(project);
  } catch (error) {
    res.send({ message: error.message });
  }
};

const getAllProjects = async (req, res) => {
  try {
    // check if the token of the user allows them to create a project.
    const { user } = req;
    const org = await models.Organization.findOne({ orgManager: { _id: user.orgManager._id } }).select(
      '_id status orgManager'
    );
    if (org.status === 'INACTIVE') {
      res.send({
        message: 'Not allowed to project. Account not yet activated.',
      });
      return;
    }

    // check if this project already exists
    const projects = await models.Project.find().select('-__v');
    res.send(projects);
  } catch (error) {
    res.send({ message: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    // check if the token of the user allows them to create a project.
    const { user } = req;
    const org = await models.Organization.findOne({ orgManager: { _id: user.orgManager._id } }).select(
      '_id status orgManager'
    );
    if (org.status === 'INACTIVE') {
      res.send({
        message: 'Not allowed to project. Account not yet activated.',
      });
      return;
    }

    // check if the user is trying to edit fields they are not supposed to.
    const args = req.body;
    if (args.orgManager != null || args.organization != null) {
      res.send({
        message: 'Not allowed to edit organization manager and organization.',
      });
      return;
    }

    const project = await models.Project.findOneAndUpdate(
      { _id: args._id },
      {
        $set: { ...args },
      },
      { new: true }
    );

    res.send(project);
  } catch (error) {
    res.send({ message: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    // check if the token of the user allows them to create a project.
    const { user } = req;
    const org = await models.Organization.findOne({ orgManager: { _id: user.orgManager._id } }).select(
      '_id status orgManager'
    );
    if (!org) {
      res.send({
        message: 'Not allowed to delete the project.',
      });
      return;
    }

    // check if the user is trying to edit fields they are not supposed to.
    const args = req.body;
    if (args.orgManager != null || args.organization != null) {
      res.send({
        message: 'Not allowed to edit organization manager and organization.',
      });
      return;
    }
    const { projectId } = req.params;
    const project = await models.Project.findByIdAndRemove({ _id: projectId });
    res.send({
      message: 'Project deleted successfully.',
    });

    // this functionality has not been tested yet --> might be buggy
    await models.OrgManager.findOneAndUpdate(
      { _id: { _id: org.orgManager._id } },
      {
        $pop: {
          projects: project,
        },
      },
      { new: true }
    );

    await models.Organization.findOneAndUpdate(
      { _id: org._id },
      {
        $pop: {
          projects: project,
        },
      },
      { new: true }
    );
  } catch (error) {
    res.send({ message: error.message });
  }
};

export default {
  createProject,
  getProject,
  getAllProjects,
  updateProject,
  deleteProject,
};
