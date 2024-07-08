import { HttpError } from 'routing-controllers';

export class DatabaseError extends HttpError {
  constructor(message: string) {
    super(500, message);
    this.name = 'DatabaseError';
  }
}
