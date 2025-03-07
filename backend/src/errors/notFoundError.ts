import { StatusCodes } from 'http-status-codes';
import { CustomError } from './customError';

export class NotFoundError extends CustomError {
  private static readonly _statusCode = StatusCodes.NOT_FOUND;
  private readonly _code: number;
  private readonly _logging: boolean;
  private readonly _context: { [key: string]: any };

  constructor(params?: {
    code?: number,
    message?: string,
    logging?: boolean,
    context?: { [key: string]: any }
  }) {
    const { code, message, logging } = params || {};

    super(message || 'Bad request');
    this._code = code || NotFoundError._statusCode;
    this._logging = logging || false;
    this._context = params?.context || {};
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  get errors() {
    return [{ message: this.message, context: this._context }];
  }

  get statusCode() {
    return this._code;
  }

  get logging() {
    return this._logging;
  }
}
