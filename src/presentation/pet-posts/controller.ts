import { Request, Response } from 'express';
import {
  ApprovePetPostService,
  CreatorPetService,
  EliminatorPetService,
  FinderPetPostsService,
  FinderPetService,
  RejectPetPostService,
  UpdatePetService,
} from './services';
import { CreatePetDto, CustomError, UpdatePostDto } from '../../domain';

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
    const [error, createPetDto] = CreatePetDto.execute(req.body);

    if (error) {
      return res.status(422).json({ message: error });
    }

    this.creatorPets
      .execute(createPetDto!)
      .then((pet) => {
        res.status(201).json(pet);
      })
      .catch((err) => {
        this.handleError(err, res);
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
