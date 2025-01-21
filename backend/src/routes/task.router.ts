import express from 'express';
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getSingleTask,
  uploadImage,
} from '../controllers/task.controller';

const taskRouter = express.Router();

taskRouter.route('/').get(getAllTasks).post(createTask);
taskRouter.route('/:id').get(getSingleTask).patch(updateTask).delete(deleteTask);
taskRouter.route('/uploadImage').post(uploadImage);

export { taskRouter };