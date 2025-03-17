import { User } from '../../../data';
import { CreateUserDto, CustomError } from '../../../domain';

export class RegisterUserService {
  async execute(userData: CreateUserDto) {
    const user = new User();

    user.name = userData.name;
    user.password = userData.password;
    user.email = userData.email;

    try {
      await user.save();
      return {
        message: 'User created successfully',
      };
    } catch (error: any) {
      this.throwException(error);
    }
  }

  private throwException(error: any) {
    if (error.code === '23505') {
      throw CustomError.conflict('Email already in use');
    }
    if (error.code === '22P02') {
      throw CustomError.unprocessableEntity('Invalid date type');
    }

    throw CustomError.internalServer('Error trying to create user');
  }
}
