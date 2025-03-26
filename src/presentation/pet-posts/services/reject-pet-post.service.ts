import { PetsPost, PetsPostStatus } from '../../../data';
import { CustomError } from '../../../domain';

export class RejectPetPostService {
  async execute(id: string) {
    const petPost = await this.findOnePetPostPendig(id);

    petPost.status = PetsPostStatus.REJECTED;

    try {
      await petPost.save();
      return {
        message: 'Pet post rejected successfully ',
      };
    } catch (error) {
      throw CustomError.internalServer(
        'An error occurred while rejecting pet post'
      );
    }
  }

  private async findOnePetPostPendig(id: string) {
    const petPost = await PetsPost.findOne({
      where: {
        id: id,
        status: PetsPostStatus.PENDING,
      },
    });

    if (!petPost) {
      throw CustomError.notFound('Pet post not found');
    }

    return petPost;
  }
}
