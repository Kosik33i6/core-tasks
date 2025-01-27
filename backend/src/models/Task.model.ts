import { Schema, model, Document } from 'mongoose';
import { isUrl } from '../utils';
import { ITaskModel } from '../types';

const TaskSchema = new Schema<ITaskModel>({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please provide a task name'],
    maxLength: [100, 'Name cannot be more than 100'],
    minLength: 3,
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'Please provide a task description'],
    maxLength: [300, 'Description cannot be more than 300'],
    minLength: 3,
  },
  image: {
    type: String,
    default: 'uploads/default.jpg',
  },
  repositoryLink: {
    type: String,
    validate: {
      validator: isUrl,
      message: 'Invalid URL format',
    },
  },
});

export const Task = model('Task', TaskSchema);