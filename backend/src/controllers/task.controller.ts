import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../errors';
import { TaskService } from '../services/task.service';

const taskService = new TaskService();

export const getAllTasks = async (req: Request, res: Response) => {
  const result = await taskService.getAllTasks();
  res.status(StatusCodes.OK).json(result);
};

export const createTask = async (req: Request, res: Response) => {
  const result = await taskService.createTask(req.body);
  res.status(StatusCodes.CREATED).json(result);
};

export const getSingleTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await taskService.getSingleTask(id);
  res.status(StatusCodes.OK).json(result);
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await taskService.updateTask(id, req.body);
  res.status(StatusCodes.OK).json(result);
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await taskService.deleteTask(id);
  res.status(StatusCodes.OK).json(result);
};

export const uploadImage = async (req: Request, res: Response) => {
  if (!req.files) {
    throw new BadRequestError('No files uploaded');
  }
  const result = await taskService.uploadImage(req.files.image);
  res.status(StatusCodes.CREATED).json(result);
};


