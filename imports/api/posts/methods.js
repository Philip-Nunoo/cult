import { Meteor } from 'meteor/meteor';
import Security from '/imports/api/security';
import PostService from './services';

Meteor.methods({
    'post.create'(post) {
        Security.checkLoggedIn(this.userId);
        return PostService.createPost({ ...post, userId: this.userId });
    },

    'post.edit'(_id, postData) {
        return PostService.editPost(_id, this.userId, postData);
    },

    'post.remove'(_id) {
        return PostService.removePost(_id, this.userId);
    },

    'post.get'(_id) {
        return PostService.getPost(_id);
    },

    'post.viewed'(_id) {
        return PostService.viewedPost(_id);
    }
});
