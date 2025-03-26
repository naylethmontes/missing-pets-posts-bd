import { Router } from 'express';
import { UserController } from './controller';
import { RegisterUserService } from '../users/services/register-user.service';
import { FinderUsersService } from '../users/services/finder-users.service';
import { UpdateUserService } from './services/update-user.service';
import { EliminatorUserService } from './services/eliminator-user.service';
import { FinderUserService } from './services/finder-user.service';
import { LoginUserService } from './services/login-user.service';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { User, UserRole } from '../../data';

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    /*const emailService = new EmailService(
      envs.MAILER_SERVICE,
      envs.MAILER_EMAIL,
      envs.MAILER_SECRET_KEY,
      envs.SEND_MAIL
    );*/
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

    router.post('/register', controller.register);

    router.post('/login', controller.login);

    router.use(AuthMiddleware.protect);

    router.get(
      '/',
      AuthMiddleware.restrictTo(UserRole.ADMIN),
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

    return router;
  }
}
