import * as express from 'express';
import { Project } from '../models/ProjectModel';

export const getMemberProject = (
  req: express.Request,
  res: express.Response
) => {
  Project.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

// export const updateMemberProject = (
//   req: express.Request,
//   res: express.Response
// ) => {
//   const data = req.body;

//   Project.updateOne({ _id: data._id }, data)
//     .then(() => {
//       res.status(200).json({
//         message: 'Member Updated!',
//       });
//     })
//     .catch((error) => {
//       res.status(400).json({
//         error: error,
//       });
//     });
// };

export const updateMemberProject = (
  req: express.Request,
  res: express.Response
) => {
  const data = req.body;

  const pr = (data.progress + (1 / data.tasksNumber) * 100).toFixed(2);
  console.log(pr);

  Project.updateOne(
    { _id: data.id },
    { $pull: { membersTasks: { _id: data._id } }, progress: pr }
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
