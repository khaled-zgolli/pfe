import * as mongoose from 'mongoose';

const newSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  date: {
    type: String,
  },
});

export const New = mongoose.model('New', newSchema);
