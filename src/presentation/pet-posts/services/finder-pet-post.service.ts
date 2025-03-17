import { PetsPost } from '../../../data';
import { CustomError } from '../../../domain';

export class FinderPetService {
  async execute(petId: string) {
    const pet = await PetsPost.findOne({
      select: ['id', 'pet_name', 'description', 'owner'],
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
