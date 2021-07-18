import * as mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  etat: {
    type: String,
    required: true,
  },
  progress: {
    type: Number,
    required: true,
    default: 0,
  },
  projectDetails: {
    type: String,
    required: true,
  },
  membersTasks: [
    {
      searchMembers: { _id: String, name: String },
      tasks: [],
    },
  ],
  tasksNumber: {
    type: Number,
    required: true,
  },
});

export const Project = mongoose.model('Project', projectSchema);
