import { StatusCodes } from 'http-status-codes';

export class BadRequestError extends Error {
  public statusCode: StatusCodes;

  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
