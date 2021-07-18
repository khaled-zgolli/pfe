import * as express from 'express';
import { Member } from '../models/MemberModel';
import * as bcrypt from 'bcrypt';

export const addMember = (req: express.Request, res: express.Response) => {
  const data = req.body;
  const newMember = new Member(data);

  Member.findOne({ email: data.email }).then((member) => {
    if (member) {
      res.json({
        msg: 'Email is already exists',
      });
    } else {
      newMember.save((err) => {
        if (err) {
          res.status(500).json({ msg: err });
        } else {
          res.json({
            msg: 'new member has been added',
          });
        }
      });
    }
  });
};

export const getMembers = (req: express.Request, res: express.Response) => {
  Member.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteMember = (req: express.Request, res: express.Response) => {
  Member.findByIdAndDelete({ _id: req.body._id })
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

export const updateMember = async (
  req: express.Request,
  res: express.Response
) => {
  const data = req.body;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  Member.updateOne(
    { _id: data._id },
    {
      _id: data._id,
      name: data.name,
      email: data.email,
      password: hashedPassword,
      birthday: data.birthday,
    }
  )
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

export const findNameId = (req: express.Request, res: express.Response) => {
  Member.find({}, { name: 1 })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const findMember = (req: express.Request, res: express.Response) => {
  Member.findOne({ _id: req.body.id })
    .then((member) => {
      if (member) {
        res.json(member);
      } else {
        res.json('no member found ');
      }
    })
    .catch((error) => {
      res.json(error);
    });
};

export const updateName = (req: express.Request, res: express.Response) => {
  Member.updateOne({ _id: req.body._id }, { name: req.body.name })
    .then(() => {
      res.status(200).json({
        message: 'name Updated!',
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

export const updateEmail = (req: express.Request, res: express.Response) => {
  Member.updateOne({ _id: req.body._id }, { email: req.body.email })
    .then(() => {
      res.status(200).json({
        message: 'email Updated!',
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

export const updatePassword = async (
  req: express.Request,
  res: express.Response
) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  Member.updateOne({ _id: req.body._id }, { password: hashedPassword })
    .then(() => {
      res.status(200).json({
        message: 'password Updated!',
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

export const updatePhone = (req: express.Request, res: express.Response) => {
  Member.updateOne({ _id: req.body._id }, { phone: req.body.phone })
    .then(() => {
      res.status(200).json({
        message: 'phone Updated!',
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

export const updateImg = (req, res) => {
  Member.updateOne({ _id: req.body._id }, { img: req.body.img })
    .then(() => {
      res.status(200).json({
        message: 'phone Updated!',
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
