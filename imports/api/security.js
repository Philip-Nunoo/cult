import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

export default class Security {
    static checkRole(userId, role) {
        if (!this.hasRole(userId, role)) {
            throw new Meteor.Error('not-authorized');
        }
    }
    static hasRole(userId, role) {
        return Roles.userIsInRole(userId, role);
    }
    static checkLoggedIn(userId) {
        if (!userId) {
            throw new Meteor.Error('not-authorized', 'You are not authorized');
        }
    }

    static isUserAllowedToDeleteComment(userId, comment, post) {
        if (userId === comment.userId || userId === post.userId) {
            return true;
        }
        throw new Meteor.Error('not-authorized', 'You are not authorized');
    }
    // add other business logic checks here that you use throughout the app
    // something like: isUserAllowedToSeeDocument()
    // always keep decoupling your code if this class gets huge.
}
