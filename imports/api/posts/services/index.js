import { Posts } from '/db';

class PostService {
    static async createPost(post) {
        const id = await Posts.insert({ ...post, createdAt: new Date() });

        return { id };
    }

    static async editPost(_id, userId, postData) {
        const id = await Posts.update(
            { _id, userId },
            { $set: { ...postData } }
        );

        return { id };
    }

    static async getPost(_id) {
        const post = await Posts.findOne({ _id });

        return post;
    }

    static async removePost(_id, userId) {
        const id = await Posts.remove({ _id, userId });

        return { id };
    }

    static async viewedPost(_id) {
        const id = await Posts.update({ _id }, { $inc: { views: 1 } });

        return { id };
    }
}

export default PostService;
