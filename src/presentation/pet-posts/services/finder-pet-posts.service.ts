import { PetsPost } from '../../../data';
import { CustomError } from '../../../domain';

export class FinderPetPostsService {
  async execute() {
    try {
      return await PetsPost.find({
        select: [
          'id',
          'pet_name',
          'description',
          'owner',
          'image_url',
          'created_at',
        ],
        where: {
          hasFound: true,
        },
      });
    } catch (error) {
      throw CustomError.internalServer('Error trying to finder users');
    }
  }
}
