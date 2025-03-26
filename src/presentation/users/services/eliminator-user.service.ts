import { User } from '../../../data';
import { CustomError } from '../../../domain';

export class EliminatorUserService {
  async execute(id: string) {
    const user = await this.ensureUserExists(id);

    user.status = false;

    try {
      await user.save();
    } catch (error) {
      throw CustomError.internalServer('Error trying to delete user');
    }
  }

  private async ensureUserExists(id: string) {
    const user = await User.findOne({
      select: ['id'],
      where: {
        id: id,
        status: true,
      },
    });

    if (!user) {
      throw CustomError.notFound(`User with id: ${id} not found`);
    }

    return user;
  }
}
