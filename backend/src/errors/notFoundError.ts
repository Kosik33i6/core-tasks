import { StatusCodes } from 'http-status-codes';

export class NotFoundError extends Error {
  public statusCode: StatusCodes;

  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
