import { Router } from 'express';
import { UserController } from './controller';
import { RegisterUserService } from '../users/services/register-user.service';
import { FinderUsersService } from '../users/services/finder-users.service';
import { UpdateUserService } from './services/update-user.service';
import { EliminatorUserService } from './services/eliminator-user.service';
import { FinderUserService } from './services/finder-user.service';
import { LoginUserService } from './services/login-user.service';

export class UserRoutes {
  static get routes(): Router {
    const router = Router();
    const registerUsers = new RegisterUserService();
    const loginUsers = new LoginUserService();
    const finderUsers = new FinderUsersService();
    const updateUsers = new UpdateUserService();
    const eliminatorUsers = new EliminatorUserService();
    const finderUser = new FinderUserService();

    const controller = new UserController(
      registerUsers,
      loginUsers,
      finderUsers,
      updateUsers,
      eliminatorUsers,
      finderUser
    );

    router.get('/', controller.findAll);

    router.post('/register', controller.register);

    router.post('/login', controller.login);

    router.get('/:id', controller.findOne);

    router.patch('/:id', controller.update);

    router.delete('/:id', controller.eliminator);

    return router;
  }
}
