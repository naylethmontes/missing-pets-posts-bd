export class ApprovePetPostService {
  async execute(postId: string) {
    return {
      message: 'post reject pet service works',
    };
  }
  /*try {
      const post = await PetsPost.findOne({
        where: { id: postId },
      });
      if (!post) {
        throw CustomError.notFound('Post no found');
      }

      post.status = PetsPostStatus.APPROVED;
      await post.save();

      return {
        message: 'Post Approved successfully',
      };
    } catch (error) {
      throw CustomError.internalServer('Error trying to change post');
    }
  }*/
}
