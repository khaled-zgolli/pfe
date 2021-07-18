import * as express from 'express';

import {
  addMember,
  getMembers,
  deleteMember,
  updateMember,
  findNameId,
  findMember,
  updateName,
  updateEmail,
  updatePassword,
  updatePhone,
  updateImg,
} from '../controllers/member';

import {
  addProject,
  getProjects,
  deleteProject,
  updateProject,
} from '../controllers/project';

import {
  addReunion,
  getMeeting,
  deleteMeeting,
  updateMeeting,
  updateTaches,
  setStateMember,
} from '../controllers/reunion';

import { verifyMember, verifyJWT } from '../controllers/auth';

import {
  addNews,
  getListNews,
  deleteNews,
  updateNews,
} from '../controllers/news';

import {
  getMemberProject,
  updateMemberProject,
} from '../controllers/memberProject';

import {
  addProjectNotif,
  getnotif,
  addMeetingNotif,
} from '../controllers/notification';

export const router = express.Router();

//member
router.post('/admin/membre/addMember', addMember);
router.get('/admin/membre', getMembers);
router.delete('/admin/membre/deleteMember', deleteMember);
router.put('/admin/membre/modifyMember', updateMember);
router.put('/updateName', updateName);
router.post('/findMember', findMember);
router.put('/updateEmail', updateEmail);
router.put('/updatePassword', updatePassword);
router.put('/updatePhone', updatePhone);
router.put('/updateImg', updateImg);

//project
router.post('/admin/project/addProject', addProject);
router.get('/admin/project/name&id', findNameId);
router.get('/admin/project', getProjects);
router.delete('/admin/project/deleteProject', deleteProject);
router.put('/admin/projet/modifyProject', updateProject);

//reunion
router.post('/admin/meeting/addMeeting', addReunion);
router.get('/admin/meeting', getMeeting);
router.delete('/admin/meeting/deleteMeeting', deleteMeeting);
router.put('/admin/meeting/modifyMeeting', updateMeeting);
router.put('/admin/meeting/details', updateTaches);
router.post('/member/meeting/state', setStateMember);

//auth
router.post('/login', verifyMember);
router.get('/isMemberAuth', verifyJWT);

//news

router.post('/admin/addNews', addNews);
router.get('/admin/news', getListNews);
router.delete('/admin/deleteNews', deleteNews);
router.put('/admin/updateNews', updateNews);

//memebr project
router.get('/member/project', getMemberProject);
router.put('/admin/updateMemberProject', updateMemberProject);

//notif
router.post('/admin/project/notif', addProjectNotif);
router.get('/admin/notif', getnotif);
router.post('/admin/Meeting/notif', addMeetingNotif);
