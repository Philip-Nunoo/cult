import { Meteor } from 'meteor/meteor';
import { Comments, Posts } from '/db';
import CommentService from './services';
import Security from '/imports/api/security';

Meteor.methods({
    'comment.create'(comment) {
        Security.checkLoggedIn(this.userId);
        return CommentService.createComment({
            ...comment,
            userId: this.userId
        });
    },
    'comment.remove': async function(_id) {
        const comment = await Comments.findOne({ _id });
        const post = await Posts.findOne({ _id: comment.postId });

        Security.isUserAllowedToDeleteComment(this.userId, comment, post);

        return CommentService.removeComment(_id);
    }
});
