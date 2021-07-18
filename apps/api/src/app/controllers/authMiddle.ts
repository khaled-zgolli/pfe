// import * as jwt from 'jsonwebtoken';

// export const requireAuth = (req, res, next) => {
//   const token = req.cookies.jwt;

//   // check json web token exists & is verified
//   if (token) {
//     jwt.verify(
//       token,
//       '07eed086c5e1882ef138c203aadc6bcce2ffbdbc640cd740b357ec9c3cd61661124a31b53844d361cf6673c8fcbdf6080b404ddb8c89d5c333bfd943c1e4064b',
//       (err, decodedToken) => {
//         if (err) {
//           console.log(err);
//           res.redirect('/');
//         } else {
//           res.json({
//             isAuth: 'true',
//           });
//           next();
//         }
//       }
//     );
//   } else {
//     res.redirect('/');
//   }
// };
