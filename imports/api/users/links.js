import { Posts, Users, Comments } from '/db';

Users.addLinks({
    posts: {
        collection: Posts,
        inversedBy: 'author'
    },
    comments: {
        inversedBy: 'author',
        collection: Comments
    }
});
