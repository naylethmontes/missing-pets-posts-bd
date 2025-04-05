import { User } from '../../../data/postgres/models/user.model';
import { CustomError } from '../../../domain';

export class FinderUsersService {
  async execute() {
    try {
      return await User.find({
        select: ['id', 'fullName', 'email', 'rol', 'created_at'],
        where: {
          status: true,
        },
      });
    } catch (error) {
      throw CustomError.internalServer('Error trying to finder users');
    }
  }
}
