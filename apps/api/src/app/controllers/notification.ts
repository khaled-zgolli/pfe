import * as express from 'express';
import { Notif } from '../models/notifModel';

export const addProjectNotif = (
  req: express.Request,
  res: express.Response
) => {
  console.log(req.body);

  const data = req.body;

  const newNotif = new Notif(data);
  newNotif.save((err) => {
    if (err) {
      res.status(500).json({ msg: err });
    } else {
      res.json({
        msg: ' new notif has been added',
      });
    }
  });
};

export const getnotif = (req: express.Request, res: express.Response) => {
  Notif.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addMeetingNotif = (
  req: express.Request,
  res: express.Response
) => {
  console.log(req.body);

  const data = req.body;

  const newNotif = new Notif(data);
  newNotif.save((err) => {
    if (err) {
      res.status(500).json({ msg: err });
    } else {
      res.json({
        msg: ' new notif has been added',
      });
    }
  });
};
