import * as express from 'express';
import { Reunion } from '../models/ReunionModel';

export const addReunion = (req: express.Request, res: express.Response) => {
  const data = req.body;

  const newReunion = new Reunion(data);
  newReunion.save((err) => {
    if (err) {
      res.status(500).json({ msg: err });
    } else {
      res.json({
        msg: ' new meeting has been added',
      });
    }
  });
};

export const getMeeting = (req: express.Request, res: express.Response) => {
  Reunion.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteMeeting = (req: express.Request, res: express.Response) => {
  Reunion.findByIdAndDelete({ _id: req.body._id })
    .then(() => {
      res.status(200).json({
        message: 'Meeting Deleted!',
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

export const updateMeeting = (req: express.Request, res: express.Response) => {
  const data = req.body;

  Reunion.updateOne({ _id: data._id }, data)
    .then(() => {
      res.status(200).json({
        message: 'Meeting Updated!',
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

export const updateTaches = (req: express.Request, res: express.Response) => {
  const data = req.body;

  Reunion.updateOne({ _id: data._id }, { taches: data.taches })
    .then(() => {
      res.status(200).json({
        message: 'Meeting Updated!',
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

export const setStateMember = (req: express.Request, res: express.Response) => {
  const data = req.body;
  console.log(data.id);

  Reunion.updateOne(
    { _id: data.id, 'members._id': data._id },
    { $set: { 'members.$.state': data.state } }
  )
    .then(() => {
      res.status(200).json({
        message: 'Updated!',
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
// { 'members._id': data._id },
//     { $set: { 'members.$.state': data.state } }
