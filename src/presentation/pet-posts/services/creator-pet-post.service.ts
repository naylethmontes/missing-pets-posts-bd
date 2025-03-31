import { PetsPost, User } from '../../../data';
import { CustomError, CreatePetDto } from '../../../domain';
import { FinderUserService } from '../../users/services';

export class CreatorPetService {
  constructor(private readonly finderUserService: FinderUserService) {}

  async execute(petData: CreatePetDto) {
    const pet = new PetsPost();

    const user = await this.finderUserService.execute(petData.user_id);

    pet.pet_name = petData.pet_name;
    pet.description = petData.description;
    pet.owner = petData.owner;
    pet.image_url = petData.image_url;
    pet.user = user;

    try {
      await pet.save();
      return {
        message: 'Post created successfully',
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
