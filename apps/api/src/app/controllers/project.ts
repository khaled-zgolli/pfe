import * as express from 'express';
import { Project } from '../models/ProjectModel';

export const addProject = (req: express.Request, res: express.Response) => {
  const data = req.body;

  const newProject = new Project(data);
  newProject.save((err) => {
    if (err) {
      res.status(500).json({ msg: err });
    } else {
      res.json({
        msg: ' new project has been added',
      });
    }
  });
};

export const getProjects = (req: express.Request, res: express.Response) => {
  Project.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteProject = (req: express.Request, res: express.Response) => {
  Project.findByIdAndDelete({ _id: req.body._id })
    .then(() => {
      res.status(200).json({
        message: 'Project Deleted!',
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

export const updateProject = (req: express.Request, res: express.Response) => {
  const data = req.body;

  Project.updateOne({ _id: data._id }, data)
    .then(() => {
      res.status(200).json({
        message: 'Member Updated!',
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
