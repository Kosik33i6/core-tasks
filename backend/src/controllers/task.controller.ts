// task.controller.ts
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../errors';
import { TaskService } from '../services';

export class TaskController {
  private taskService: TaskService;

  constructor(taskService: TaskService) {
    this.taskService = taskService;
  }

  public getAllTasks = async (req: Request, res: Response): Promise<void> => {
    const result = await this.taskService.getAllTasks();
    res.status(StatusCodes.OK).json(result);
  };

  public createTask = async (req: Request, res: Response): Promise<void> => {
    const result = await this.taskService.createTask(req.body);
    res.status(StatusCodes.CREATED).json(result);
  };

  public getSingleTask = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const result = await this.taskService.getSingleTask(id);
    res.status(StatusCodes.OK).json(result);
  };

  public updateTask = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const result = await this.taskService.updateTask(id, req.body);
    res.status(StatusCodes.OK).json(result);
  };

  public deleteTask = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const result = await this.taskService.deleteTask(id);
    res.status(StatusCodes.OK).json(result);
  };

  public uploadImage = async (req: Request, res: Response): Promise<void> => {
    if (!req.files) {
      throw new BadRequestError('No files uploaded');
    }
    const result = await this.taskService.uploadImage(req.files.image);
    res.status(StatusCodes.CREATED).json(result);
  };
}