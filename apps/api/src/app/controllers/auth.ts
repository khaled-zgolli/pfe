import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { Member } from '../models/MemberModel';
import * as bcrypt from 'bcrypt';

export const verifyMember = (req: express.Request, res: express.Response) => {
  Member.findOne({ email: req.body.email })
    .then((member) => {
      if (member === null) {
        return res.json({
          msg: 'Auth failed',
        });
      }

      bcrypt.compare(req.body.password, member.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            msg: 'Auth failed',
          });
        }
        if (result) {
          const maxAge = 1 * 24 * 60 * 60;

          const token = jwt.sign(
            {
              id: member._id,
            },
            '07eed086c5e1882ef138c203aadc6bcce2ffbdbc640cd740b357ec9c3cd61661124a31b53844d361cf6673c8fcbdf6080b404ddb8c89d5c333bfd943c1e4064b',
            {
              expiresIn: maxAge,
            }
          );
          res.json({
            auth: true,
            token: token,
            result: member,
            admin: member.admin,
          });
          // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });
          // return res.status(200).json({
          //   msg: 'Auth successful',
          // });
        } else {
          res.json({ auth: false, message: 'no user exists' });
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// export const isMemberAuth = (req: express.Request, res: express.Response) => {
//   res.send('true');
// };

export const verifyJWT = (req: express.Request, res: express.Response) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    res.json('need token');
  } else {
    jwt.verify(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      token,
      '07eed086c5e1882ef138c203aadc6bcce2ffbdbc640cd740b357ec9c3cd61661124a31b53844d361cf6673c8fcbdf6080b404ddb8c89d5c333bfd943c1e4064b',
      (err, decoded) => {
        if (err) {
          res.json({ auth: false, message: 'failed' });
        } else {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const memberId = decoded.id;
          Member.findOne({ _id: memberId })
            .then((member) => {
              res.json({ auth: 'true', member: member, admin: member.admin });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    );
  }
};

// export const logout = (req: express.Request, res: express.Response) => {
//   // res.cookie('jwt', '', { maxAge: 1 });
//   // res.redirect('/');
//   localStorage.removeItem('token');
// };
