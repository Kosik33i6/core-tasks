import mongoose from 'mongoose';
import { isUrl } from '../utils';

const { Schema } = mongoose;

interface TaskModel {
  name: string;
  description: string;
  image: string;
  repositoryLink: string;
}

const TaskSchema = new Schema<TaskModel>({
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

export const Task = mongoose.model('Task', TaskSchema);