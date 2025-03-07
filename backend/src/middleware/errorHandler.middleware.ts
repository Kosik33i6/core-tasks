import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { CustomError } from '../errors';
import mongoose from 'mongoose';

export const errorhandlerMiddleware: ErrorRequestHandler = (
  err: Error | mongoose.Error.ValidationError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof CustomError) {
    const { statusCode, errors } = err;

    res.status(statusCode).json({ errors });
    return;
  }

  if (err instanceof mongoose.Error.ValidationError) {
    const validationErrors = Object.values(err.errors).map((error) => error.message);

    res.status(StatusCodes.BAD_REQUEST).json({
      errors: validationErrors,
    });
    return;
  }

  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: 'Internal Server Error' });
  return;
};
