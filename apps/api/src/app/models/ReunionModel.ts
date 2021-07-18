import * as mongoose from 'mongoose';


const reunionSchema = new mongoose.Schema({
  meetingName: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  begin: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    default: '',
  },
  taches: {
    type: String,
    default: '',
  },
  members: [
    { name: String, _id: String, state: { type: String, default: '' } },
  ],
});

export const Reunion = mongoose.model('Reunion', reunionSchema);
