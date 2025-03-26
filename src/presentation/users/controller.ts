import { Request, Response } from 'express';
import {
  CreateUserDto,
  CustomError,
  LoginUserDto,
  UpdateUserDto,
} from '../../domain';
import {
  EliminatorUserService,
  FinderUserService,
  FinderUsersService,
  LoginUserService,
  RegisterUserService,
  UpdateUserService,
} from './services';
import { envs } from '../../config';

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
    console.log(error);
    return res.status(500).json({ message: 'Something went very wrong💣' });
  };

  register = (req: Request, res: Response) => {
    const [error, createUserDto] = CreateUserDto.execute(req.body);

    if (error) {
      return res.status(422).json({ message: error });
    }

    this.registerUsers
      .execute(createUserDto!)
      .then((user) => res.status(201).json(user))
      .catch((err) => this.handleError(err, res));
  };

  login = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.execute(req.body);
    if (error) {
      return res.status(422).json({ message: error });
    }

    this.loginUsers
      .execute(loginUserDto!)
      .then((data) => {
        res.cookie('token', data.token, {
          httpOnly: true,
          secure: envs.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 3 * 60 * 60 * 1000,
        });

        return res.status(200).json({ user: data.user });
      })
      .catch((err) => this.handleError(err, res));
  };

  findAll = (req: Request, res: Response) => {
    this.finderUsers
      .execute()
      .then((users) => res.status(200).json(users))
      .catch((err) => this.handleError(err, res));
  };

  update = (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, updateUserDto] = UpdateUserDto.execute(req.body);

    if (error) {
      return res.status(422).json({ message: error });
    }

    this.updateUsers
      .execute(id, updateUserDto!)

      .then((user) => res.status(200).json(user))
      .catch((err) => this.handleError(err, res));
  };

  eliminator = (req: Request, res: Response) => {
    this.eliminatorUsers
      .execute(req.params.id)
      .then(() => res.status(204).json(null))
      .catch((err) => this.handleError(err, res));
  };

  findOne = (req: Request, res: Response) => {
    const { id } = req.params;

    this.finderUser
      .execute(id)
      .then((user) => res.status(200).json(user))
      .catch((err) => this.handleError(err, res));
  };

  /*validateAccount = (req: Request, res: Response) => {
    const { token } = req.params;

    this.registerUsers
      .validateAccount(token)
      .then(() => res.send('Email validated sucessfully'))
      .catch((err) => this.handleError(err, res));
  };*/
}
