import { Router } from 'express';
import { PetController } from './controller';
import { CreatorPetService } from './services/creator-pet-post.service';
import { FinderPetPostsService } from './services/finder-pet-posts.service';
import { FinderPetService } from './services/finder-pet-post.service';
import { UpdatePetService } from './services/update-pet-post.service';
import { EliminatorPetService } from './services/eliminator-pet-post.service';
import { ApprovePetPostService } from './services/approve-pet-post.service';
import { RejectPetPostService } from './services/reject-pet-post.service';

export class PetRoutes {
  static get routes(): Router {
    const router = Router();

    const creatorPets = new CreatorPetService();
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

    router.post('/', controller.creator);

    router.get('/', controller.findAll);

    router.get('/:id', controller.findOne);

    router.patch('/:id', controller.update);

    router.delete('/:id', controller.eliminator);

    router.patch('/:id/approve', controller.approve);

    router.patch('/:id/reject', controller.reject);

    return router;
  }
}
