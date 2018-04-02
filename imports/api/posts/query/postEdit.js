import { createQuery } from 'meteor/cultofcoders:grapher';

export default createQuery({
    posts: {
        $filter({ filters, params }) {
            filters._id = params._id;
        },
        title: 1,
        description: 1,
        views: 1,
        userId: 1,
        type: 1,
        author: {
            emails: 1
        },
        comments: {
            text: 1,
            author: {
                emails: 1
            }
        }
    }
});
