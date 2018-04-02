import { Posts } from '/db';
import Security from '/imports/api/security';

class PostService {
    static createPost(post) {
        Security.checkLoggedIn(this.userId);
        Posts.insert({ ...post, userId: this.userId, createdAt: new Date() });
    }

    static editPost(_id, postData) {
        Security.checkLoggedIn(this.userId);
        Posts.update(
            { _id: _id, userId: this.userId },
            {
                $set: {
                    title: postData.title,
                    description: postData.description
                }
            }
        );
    }

    static removePost(_id) {
        Security.checkLoggedIn(this.userId);
        Posts.remove({ _id: _id, userId: this.userId });
    }
}

export default PostService;
