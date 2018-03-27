import { Meteor } from 'meteor/meteor';
import { Comments, Posts } from '/db';
import Security from '/imports/api/security';

Meteor.methods({
    'comment.create'(comment) {
        Security.checkLoggedIn(this.userId);
        comment.userId = this.userId;
        Comments.insert({ ...comment, createdAt: new Date() });
    },
    'comment.remove': async function(_id) {
        const comment = await Comments.findOne({ _id });
        const post = await Posts.findOne({ _id: comment.postId });

        Security.isUserAllowedToDeleteComment(this.userId, comment, post);

        Comments.remove({ _id });
    }
});
