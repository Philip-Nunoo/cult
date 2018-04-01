import { Posts, Comments, Users } from '/db';

Posts.addLinks({
    author: {
        type: 'one',
        collection: Users,
        field: 'userId',
        index: true
    },
    comments: {
        collection: Comments,
        inversedBy: 'post'
    }
});
