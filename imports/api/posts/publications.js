import { Posts, Comments, Users } from '/db';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.publishComposite('posts', function() {
    return {
        find: () => Posts.find(),
        children: [
            { find: post => Users.find({ _id: post.userId }) },
            { find: post => Comments.find({ postId: post._id }) }
        ]
    };
});

Meteor.publishComposite('post', function(postId) {
    check(postId, String);

    return {
        find: () => Posts.find({ _id: postId }),
        children: [
            { find: post => Users.find({ _id: post.userId }) },
            {
                find: post => Comments.find({ postId: post._id }),
                children: [
                    {
                        find: comment =>
                            Meteor.users.find({ _id: comment.userId })
                    }
                ]
            }
        ]
    };
});
