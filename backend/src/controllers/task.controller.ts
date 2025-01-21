import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import path from 'path';
import { Task } from '../models/Task.model';
import { NotFoundError, BadRequestError } from '../errors';
import { MAX_IMAGE_SIZE, UPLOADS_DIR } from '../config';

export const getAllTasks = async (req: Request, res: Response) => {
  const tasks = await Task.find({});
  res.status(StatusCodes.OK).json({ tasks, count: tasks.length });
};

export const createTask = async (req: Request, res: Response) => {
  const task = await Task.create(req.body);
  res.status(StatusCodes.CREATED).json({ task });
};

export const getSingleTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  if (!task) {
    throw new NotFoundError('Task not found');
  }
  res.status(StatusCodes.OK).json({ task });
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const newTask = req.body;
  const task = await Task.findByIdAndUpdate(id, newTask, {
    runValidators: true,
    new: true,
  });
  if (!task) {
    throw new NotFoundError('Task not found');
  }
  res.status(StatusCodes.OK).json({ task });
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const task = await Task.findByIdAndDelete(id);
  if (!task) {
    throw new NotFoundError('Task not found');
  }
  res.status(StatusCodes.OK).json({ msg: 'Task was removed' });
};

export const uploadImage = async (req: Request, res: Response) => {

  if (!req.files) {
    throw new BadRequestError('No files uploaded');
  }

  const { image } = req.files;

  if (Array.isArray(image)) {
    throw new BadRequestError('Multiple files uploaded. Expected only one image.');
  }

  if (!image.mimetype.startsWith('image')) {
    throw new BadRequestError('Invalid file format for image');
  }

  if (image.size > MAX_IMAGE_SIZE) {
    console.log('File size too large:', image.size);
    throw new BadRequestError('Image is too big');
  }

  const imagePath = path.join(__dirname, UPLOADS_DIR + `${ image.name }`);

  await image.mv(imagePath);

  res.status(StatusCodes.CREATED).json({ msg: 'Image uploaded successfully' });
};


