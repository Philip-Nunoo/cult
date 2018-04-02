import { Posts, Comments } from '/db';

Posts.after.remove((userId, { _id: postId }) => {
    // remove all associated comments
    Comments.remove({ postId });
});
