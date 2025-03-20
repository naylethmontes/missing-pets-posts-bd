import { Router } from 'express';
import { UserRoutes } from '../presentation/users/routes';
import { PetRoutes } from './pet-posts/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/users/', UserRoutes.routes);
    router.use('/api/petposts', PetRoutes.routes);

    return router;
  }
}
