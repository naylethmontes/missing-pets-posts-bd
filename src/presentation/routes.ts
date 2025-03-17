import { Router } from 'express';
import { UserRoutes } from '../presentation/users/routes';
import { PetRoutes } from './pet-posts/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/', UserRoutes.routes);
    router.use('/', PetRoutes.routes);

    return router;
  }
}
