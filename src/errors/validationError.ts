import { HttpError } from 'routing-controllers';

export class ValidationError extends HttpError {
  constructor(
    message: string,
    public details?: any
  ) {
    super(400, message);
    this.name = 'ValidationError';
  }
}
