import { PetsPost } from '../../../data';
import { CustomError, CreatePetDto } from '../../../domain';

export class CreatorPetService {
  async execute(petData: CreatePetDto) {
    const pet = new PetsPost();

    pet.pet_name = petData.pet_name;
    pet.description = petData.description;
    pet.owner = petData.owner;
    pet.image_url = petData.image_url;

    try {
      await pet.save();
      return {
        message: 'Pet created successfully',
      };
    } catch (error: any) {
      this.throwException(error);
    }
  }

  private throwException(error: any) {
    if (error.code === '23505') {
      throw CustomError.conflict('Pet name already in use');
    }

    if (error.code === '22P02') {
      throw CustomError.unprocessableEntity('Invalid date type');
    }

    throw CustomError.internalServer('Error trying to create user');
  }
}
