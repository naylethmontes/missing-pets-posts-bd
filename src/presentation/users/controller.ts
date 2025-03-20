import { Request, Response } from 'express';
import { CreateUserDto, CustomError, UpdateUserDto } from '../../domain';
import {
  EliminatorUserService,
  FinderUserService,
  FinderUsersService,
  LoginUserService,
  RegisterUserService,
  UpdateUserService,
} from './services';

export class UserController {
  constructor(
    private readonly registerUsers: RegisterUserService,
    private readonly loginUsers: LoginUserService,
    private readonly finderUsers: FinderUsersService,
    private readonly updateUsers: UpdateUserService,
    private readonly eliminatorUsers: EliminatorUserService,
    private readonly finderUser: FinderUserService
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    console.error(error);
    return res.status(500).json({ message: 'Something went very wrong💣' });
  };

  register = (req: Request, res: Response) => {
    const [error, createUserDto] = CreateUserDto.execute(req.body);

    if (error) {
      return res.status(422).json({ message: error });
    }

    this.registerUsers
      .execute(createUserDto!)
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((err) => {
        this.handleError(err, res);
      });
  };

  login = (req: Request, res: Response) => {
    this.loginUsers;
    return res.status(501).json({ message: 'no yet implemented' });
  };

  findAll = (req: Request, res: Response) => {
    this.finderUsers
      .execute()
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => {
        this.handleError(err, res);
      });
  };

  update = (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, updateUserDto] = UpdateUserDto.execute(req.body);

    if (error) {
      return res.status(422).json({ message: error });
    }

    this.updateUsers
      .execute(id, updateUserDto!)

      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        this.handleError(err, res);
      });
  };

  eliminator = (req: Request, res: Response) => {
    const { id } = req.params;
    this.eliminatorUsers
      .execute(id)
      .then(() => {
        res.status(204).json();
      })
      .catch((err) => {
        this.handleError(err, res);
      });
  };

  findOne = (req: Request, res: Response) => {
    const { id } = req.params;

    this.finderUser
      .execute(id)
      .then((user) => res.status(200).json(user))
      .catch((err) => this.handleError(err, res));
  };
}
