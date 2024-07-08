import { NextFunction, Request, Response } from 'express';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { User } from '../../models/user';
import logger from '../../utils/logger';
import { Service } from 'typedi';

@Service()
@Middleware({ type: 'before' })
export class AuthMiddleware implements ExpressMiddlewareInterface {
  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ message: 'No token provided' });
      return;
    }

    const user = await User.findOne({ where: { token } });
    if (!user) {
      logger.error('Invalid access token');
      res.status(401).json({ message: 'Invalid token' });
      return;
    }

    req.user = user;
    next();
  }
}
