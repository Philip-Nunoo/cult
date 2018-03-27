import { Posts, Comments } from '/db';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.publish('posts', function() {
    return Posts.find();
});

Meteor.publish('post', function(postId) {
    check(postId, String);

    return postId
        ? [
              Posts.find({ _id: postId }),
              Comments.find({ postId: postId }, { sort: { createdAt: -1 } })
          ]
        : null;
});
