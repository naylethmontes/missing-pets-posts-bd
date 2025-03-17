import { Request, Response } from 'express';
import { CreatorPetService } from './services/creator-pet-post.service';
import { FinderPetPostsService } from './services/finder-pet-posts.service';
import { FinderPetService } from './services/finder-pet-post.service';
import { UpdatePetService } from './services/update-pet-post.service';
import { EliminatorPetService } from './services/eliminator-pet-post.service';
import { ApprovePetPostService } from './services/approve-pet-post.service';
import { RejectPetPostService } from './services/reject-pet-post.service';
import { CustomError } from '../../domain';
import { CreatePetDto } from '../../domain/dtos/post-pet/create-post.dto';
import { UpdatePostDto } from '../../domain/dtos/post-pet/update.post.dto';

export class PetController {
  constructor(
    private readonly creatorPets: CreatorPetService,
    private readonly finderPetPosts: FinderPetPostsService,
    private readonly finderPets: FinderPetService,
    private readonly updatePets: UpdatePetService,
    private readonly eliminatorPets: EliminatorPetService,
    private readonly approvePetPost: ApprovePetPostService,
    private readonly rejectPetPost: RejectPetPostService
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    console.error(error);
    return res.status(500).json({ message: 'Something went very wrong💣' });
  };

  creator = (req: Request, res: Response) => {
    const [error, createUserDto] = CreatePetDto.execute(req.body);

    if (error) {
      return res.status(422).json({ message: error });
    }

    this.creatorPets
      .execute(createUserDto!)
      .then((result) => {
        res.status(200).json({ message: result });
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  };

  findAll = (req: Request, res: Response) => {
    this.finderPetPosts
      .execute()
      .then((pets) => {
        res.status(200).json(pets);
      })
      .catch((err) => {
        this.handleError(err, res);
      });
  };

  findOne = (req: Request, res: Response) => {
    const { id } = req.params;

    this.finderPets
      .execute(id)
      .then((pet) => res.status(200).json(pet))
      .catch((err) => this.handleError(err, res));
  };

  update = (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, updatePostDto] = UpdatePostDto.execute(req.body);

    if (error) {
      return res.status(422).json({ message: error });
    }

    this.updatePets
      .execute(id, updatePostDto!)

      .then((pet) => {
        res.status(201).json(pet);
      })
      .catch((err) => {
        this.handleError(err, res);
      });
  };

  eliminator = (req: Request, res: Response) => {
    const { id } = req.params;
    this.eliminatorPets
      .execute(id)
      .then((result) => {
        res.status(200).json({ message: result });
      })
      .catch((err) => {
        this.handleError(err, res);
      });
  };

  approve = (req: Request, res: Response) => {
    this.approvePetPost
      .execute()
      .then((pet) => res.status(201).json(pet))
      .catch(() => res.status(200).json({}));
  };

  reject = (req: Request, res: Response) => {
    this.rejectPetPost
      .execute()
      .then((pet) => res.status(201).json(pet))
      .catch(() => res.status(200).json({}));
  };
}
