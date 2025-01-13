import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

export const errorhandlerMiddleware = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: 'Internal Server Error' });
};
