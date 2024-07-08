import { NextFunction, Request, Response } from 'express';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { Model, ModelStatic } from 'sequelize';
import { Service } from 'typedi';
import { UserRoleEnum } from '../../enums/userRolesEnum';

@Service()
@Middleware({ type: 'before' })
export class IsAdminMiddleware implements ExpressMiddlewareInterface {
  use(req: Request, res: Response, next: NextFunction): void {
    if (req.user?.role === UserRoleEnum.ADMIN) {
      return next();
    }
    res.status(403).json({ message: 'Forbidden' });
  }
}

export function HasRoleOrOwnershipMiddlewareFactory(role: string, model?: ModelStatic<Model>) {
  @Middleware({ type: 'before' })
  @Service()
  class HasRoleOrOwnershipMiddleware implements ExpressMiddlewareInterface {
    async use(req: Request, res: Response, next: NextFunction): Promise<void> {
      if (req.user?.role === role) {
        return next();
      }

      if (model) {
        if (req.params.id) {
          const instance = await model.findByPk(req.params.id);
          if (!instance) {
            res.status(404).json({ message: `${model.name} not found` });
            return;
          }

          if ((instance as any).userId === req.user?.id) {
            return next();
          }

          res.status(403).json({ message: 'Forbidden' });
          return;
        }

        const instances = await model.findAll({ where: { userId: req.user?.id } });
        if (instances.length > 0) {
          return next();
        }
      }

      res.status(403).json({ message: 'Forbidden' });
    }
  }

  return HasRoleOrOwnershipMiddleware;
}
