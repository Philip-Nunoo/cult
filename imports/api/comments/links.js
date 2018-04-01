import { Users, Posts, Comments } from '/db';

Comments.addLinks({
    author: {
        type: 'one',
        collection: Users,
        field: 'userId',
        index: true
    },
    post: {
        type: 'one',
        collection: Posts,
        field: 'postId',
        index: true
    }
});
