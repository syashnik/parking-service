import { NextFunction, Request, Response } from 'express';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { Service } from 'typedi';
import { validate as uuidValidate } from 'uuid';

@Service()
@Middleware({ type: 'before' })
export class IsValidUUIDMiddleware implements ExpressMiddlewareInterface {
  use(req: Request, res: Response, next: NextFunction): void {
    const id = req.params.id;
    if (id && !uuidValidate(id)) {
      res.status(400).json({ error: 'Invalid UUID format' });
      return;
    }
    next();
  }
}
