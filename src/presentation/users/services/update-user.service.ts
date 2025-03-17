import { User } from '../../../data';
import { CustomError, UpdateUserDto } from '../../../domain';

export class UpdateUserService {
  async execute(userId: string, userData: UpdateUserDto) {
    const user = await this.ensureUserExists(userId);

    user.name = userData.name;
    user.email = userData.email;

    try {
      await user.save();

      return {
        message: 'User update successfully',
      };
    } catch (error) {
      this.throwException(error);
    }
  }

  private async ensureUserExists(userId: string): Promise<User> {
    const user = await User.findOne({
      select: ['id'],
      where: {
        id: userId,
        status: true,
      },
    });

    if (!user) {
      throw CustomError.notFound(`User with id: ${userId} not found`);
    }

    return user;
  }

  private throwException(error: any) {
    if (error.code === '23505') {
      throw CustomError.conflict('Email already in use');
    }
    if (error.code === '22P02') {
      throw CustomError.unprocessableEntity('Invalid date type');
    }

    throw CustomError.internalServer('Error trying to update user');
  }
}
