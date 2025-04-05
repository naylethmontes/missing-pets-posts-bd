import { PetsPost } from '../../../data';
import { CustomError } from '../../../domain';

export class FinderPetPostsService {
  async execute() {
    try {
      return await PetsPost.find({
        relations: ['user'],
        select: {
          user: {
            id: true,
            fullName: true,
            email: true,
          },
        },
        where: {
          hasFound: true,
        },
        /*select: [
          'id',
          'pet_name',
          'description',
          'owner',
          'image_url',
          'created_at',
        ],*/
      });
    } catch (error) {
      throw CustomError.internalServer('Error trying to finder users');
    }
  }
}
