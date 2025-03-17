import { User } from '../../../data';
import { CustomError } from '../../../domain';

export class FinderUserService {
  async execute(userId: string) {
    const user = await User.findOne({
      select: ['id', 'name', 'email', 'rol'],
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
}
