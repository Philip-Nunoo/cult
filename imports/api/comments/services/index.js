import { Comments } from '/db';

class PostService {
    static async createComment(comment) {
        const id = await Comments.insert({ ...comment, createdAt: new Date() });

        return { id };
    }

    static async editComment(_id, userId, commentData) {
        const id = await Comments.update(
            { _id, userId },
            { $set: { ...commentData } }
        );

        return { id };
    }

    static async getComment(_id) {
        const comment = await Comments.findOne({ _id });

        return comment;
    }

    static async removeComment(_id, userId) {
        const id = await Comments.remove({ _id, userId });

        return { id };
    }
}

export default PostService;
