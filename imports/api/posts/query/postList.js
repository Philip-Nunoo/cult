import { createQuery } from 'meteor/cultofcoders:grapher';

export default createQuery({
    posts: {
        title: 1,
        description: 1,
        views: 1,
        type: 1,
        comments: { _id: 1, userId: 1 },
        author: { _id: 1 }
    }
});
