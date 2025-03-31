import { Router } from 'express';
import { PetController } from './controller';
import { CreatorPetService } from './services/creator-pet-post.service';
import { FinderPetPostsService } from './services/finder-pet-posts.service';
import { FinderPetService } from './services/finder-pet-post.service';
import { UpdatePetService } from './services/update-pet-post.service';
import { EliminatorPetService } from './services/eliminator-pet-post.service';
import { ApprovePetPostService } from './services/approve-pet-post.service';
import { RejectPetPostService } from './services/reject-pet-post.service';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { UserRole } from '../../data';
import { FinderUserService } from '../users/services';

export class PetRoutes {
  static get routes(): Router {
    const router = Router();

    const finderUserService = new FinderUserService();
    const creatorPets = new CreatorPetService(finderUserService);
    const finderPetPosts = new FinderPetPostsService();
    const finderPets = new FinderPetService();
    const updatePets = new UpdatePetService();
    const eliminatorPets = new EliminatorPetService();
    const approvePetPost = new ApprovePetPostService();
    const rejectPetPost = new RejectPetPostService();

    const controller = new PetController(
      creatorPets,
      finderPetPosts,
      finderPets,
      updatePets,
      eliminatorPets,
      approvePetPost,
      rejectPetPost
    );

    router.use(AuthMiddleware.protect);

    router.post(
      '/',
      AuthMiddleware.restrictTo(UserRole.USER),
      controller.creator
    );

    router.get(
      '/',
      AuthMiddleware.restrictTo(UserRole.USER),
      controller.findAll
    );

    router.get(
      '/:id',
      AuthMiddleware.restrictTo(UserRole.USER),
      controller.findOne
    );

    router.patch(
      '/:id',
      AuthMiddleware.restrictTo(UserRole.ADMIN),
      controller.update
    );

    router.delete(
      '/:id',
      AuthMiddleware.restrictTo(UserRole.ADMIN),
      controller.eliminator
    );

    router.patch(
      '/:id/approve',
      AuthMiddleware.restrictTo(UserRole.ADMIN, UserRole.USER),
      controller.approve
    );

    router.patch(
      '/:id/reject',
      AuthMiddleware.restrictTo(UserRole.ADMIN, UserRole.USER),
      controller.reject
    );

    return router;
  }
}
