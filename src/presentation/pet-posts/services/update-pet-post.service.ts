import { PetsPost } from '../../../data';
import { CustomError } from '../../../domain';
import { UpdatePostDto } from '../../../domain/dtos/post-pet/update.post.dto';

export class UpdatePetService {
  async execute(petId: string, petData: UpdatePostDto) {
    const pet = await this.ensureUserExists(petId);

    pet.pet_name = petData.pet_name;
    pet.description = petData.description;

    try {
      await pet.save();

      return {
        message: 'Pet update successfully',
      };
    } catch (error) {
      this.throwException(error);
    }
  }

  private async ensureUserExists(petId: string): Promise<PetsPost> {
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

  private throwException(error: any) {
    if (error.code === '23505') {
      throw CustomError.conflict('Description already in use');
    }
    if (error.code === '22P02') {
      throw CustomError.unprocessableEntity('Invalid date type');
    }

    throw CustomError.internalServer('Error trying to update user');
  }
}
