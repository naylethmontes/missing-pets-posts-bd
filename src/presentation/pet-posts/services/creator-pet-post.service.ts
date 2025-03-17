import { PetsPost } from '../../../data';
import { CustomError } from '../../../domain';
import { CreatePetDto } from '../../../domain/dtos/post-pet/create-post.dto';

export class CreatorPetService {
  async execute(petData: CreatePetDto) {
    const pet = new PetsPost();

    pet.pet_name = petData.pet_name;
    pet.description = petData.description;
    pet.owner = petData.owner;

    try {
      await pet.save();
      return {
        message: 'User created successfully',
      };
    } catch (error: any) {
      this.throwException(error);
    }
  }

  private throwException(error: any) {
    if (error.code === '23505') {
      throw CustomError.conflict('Description already in use');
    }
    if (error.code === '22P02') {
      throw CustomError.unprocessableEntity('Invalid date type');
    }

    throw CustomError.internalServer('Error trying to create user');
  }
}
