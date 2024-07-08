import { HttpError } from 'routing-controllers';

export class UnauthorizedError extends HttpError {
  constructor(message: string) {
    super(403, message);
    this.name = 'UnauthorizedError';
  }
}
