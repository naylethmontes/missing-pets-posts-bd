import { PetsPost } from '../../../data';
import { CustomError } from '../../../domain';

export class EliminatorPetService {
  async execute(petId: string) {
    const pet = await this.ensureUserExists(petId);

    pet.hasFound = false;

    try {
      await pet.save();
    } catch (error) {
      throw CustomError.internalServer('Error trying to delete user');
    }
  }

  private async ensureUserExists(petId: string) {
    const pet = await PetsPost.findOne({
      select: ['id'],
      where: {
        id: petId,
        hasFound: true,
      },
    });

    if (!pet) {
      throw CustomError.notFound(`User with id: ${petId} not found`);
    }

    return pet;
  }
}
