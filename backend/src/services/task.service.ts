import { Task } from '../models/Task.model';
import { NotFoundError, BadRequestError } from '../errors';
import path from 'path';
import { MAX_IMAGE_SIZE, UPLOADS_DIR } from '../config';
import { UploadedFile } from 'express-fileupload';
import { ITaskModel } from '../types';

export class TaskService {
  async getAllTasks() {
    const tasks = await Task.find({});
    return { tasks, count: tasks.length };
  }

  async createTask(taskData: ITaskModel) {
    const task = await Task.create(taskData);
    return { task };
  }

  async getSingleTask(id: string) {
    const task = await Task.findById(id);
    if (!task) {
      throw new NotFoundError('Task not found');
    }
    return { task };
  }

  async updateTask(id: string, taskData: ITaskModel) {
    const task = await Task.findByIdAndUpdate(id, taskData, {
      runValidators: true,
      new: true,
    });
    if (!task) {
      throw new NotFoundError('Task not found');
    }
    return { task };
  }

  async deleteTask(id: string) {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      throw new NotFoundError('Task not found');
    }
    return { msg: 'Task was removed' };
  }

  async uploadImage(file: UploadedFile | UploadedFile[]) {
    if (!file) {
      throw new BadRequestError('No files uploaded');
    }

    if (Array.isArray(file)) {
      throw new BadRequestError('Multiple files uploaded. Expected only one image.');
    }

    await this.validateImage(file);
    await this.saveImage(file);

    return { msg: 'Image uploaded successfully' };
  }

  private async validateImage(image: UploadedFile) {
    if (!image.mimetype.startsWith('image')) {
      throw new BadRequestError('Invalid file format for image');
    }

    if (image.size > MAX_IMAGE_SIZE) {
      throw new BadRequestError('Image is too big');
    }
  }

  private async saveImage(image: UploadedFile) {
    const imagePath = path.join(__dirname, UPLOADS_DIR, image.name);
    await image.mv(imagePath);
  }
}