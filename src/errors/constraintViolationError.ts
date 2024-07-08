export class ConstraintViolationError extends Error {
  public readonly name: string = 'ConstraintViolationError';
  constructor(
    public message: string,
    public details?: any
  ) {
    super(message);
    Object.setPrototypeOf(this, ConstraintViolationError.prototype);
  }
}
