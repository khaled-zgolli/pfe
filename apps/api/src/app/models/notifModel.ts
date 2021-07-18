import * as mongoose from 'mongoose';

const notifSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  membersId: {
    type: [],
    required: true,
  },
});

export const Notif = mongoose.model('Notif', notifSchema);
