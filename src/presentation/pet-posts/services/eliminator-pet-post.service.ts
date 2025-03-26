import { PetsPost } from '../../../data';
import { CustomError } from '../../../domain';

export class EliminatorPetService {
  async execute(id: string) {
    const pet = await this.ensureUserExists(id);

    pet.hasFound = false;

    try {
      await pet.save();
    } catch (error) {
      throw CustomError.internalServer('Error trying to delete user');
    }
  }

  private async ensureUserExists(id: string) {
    const pet = await PetsPost.findOne({
      select: ['id'],
      where: {
        id: id,
        hasFound: true,
      },
    });

    if (!pet) {
      throw CustomError.notFound(`User with id: ${id} not found`);
    }

    return pet;
  }
}
