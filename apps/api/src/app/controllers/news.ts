import * as express from 'express';

import { New } from '../models/NewModel';

export const addNews = (req: express.Request, res: express.Response) => {
  const data = req.body;

  const newNews = new New(data);
  newNews.save((err) => {
    if (err) {
      res.status(500).json({ msg: err });
    } else {
      res.json({
        msg: ' news has been added',
      });
    }
  });
};

export const getListNews = (req: express.Request, res: express.Response) => {
  New.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteNews = (req: express.Request, res: express.Response) => {
  New.findByIdAndDelete({ _id: req.body._id })
    .then(() => {
      res.status(200).json({
        message: 'Member Deleted!',
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

export const updateNews = (req: express.Request, res: express.Response) => {
  const data = req.body;

  New.updateOne({ _id: data._id }, data)
    .then(() => {
      res.status(200).json({
        message: 'News Updated!',
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
