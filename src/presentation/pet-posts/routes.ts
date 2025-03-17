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

    router.post('/api/petposts', controller.creator);

    router.get('/api/petposts', controller.findAll);

    router.get('/api/petposts/:id', controller.findOne);

    router.patch('/api/petposts/:id', controller.update);

    router.delete('/api/petposts/:id', controller.eliminator);

    router.patch('/api/petposts/:id/approve', controller.approve);

    router.patch('/api/petposts/:id/reject', controller.reject);

    return router;
  }
}
