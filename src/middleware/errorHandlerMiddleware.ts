import { ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { ExpressErrorMiddlewareInterface, Middleware } from 'routing-controllers';
import { Service } from 'typedi';
import logger from '../utils/logger';

@Service()
@Middleware({ type: 'after' })
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
  error(error: any, req: Request, res: Response, next: NextFunction): void {
    logger.error(error.message, error);

    if (error.errors && Array.isArray(error.errors) && error.errors[0] instanceof ValidationError) {
      const validationErrors = error.errors.map((err: ValidationError) => {
        return {
          property: err.property,
          constraints: err.constraints,
          children: err.children,
        };
      });

      res.status(400).json({
        error: 'Validation Error',
        message: error.message,
        validationErrors,
      });
    } else if (error.httpCode) {
      res.status(error.httpCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: `Internal Server Error: ${error.message}` });
    }

    next();
  }
}
