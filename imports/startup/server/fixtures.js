import faker from 'faker';
import { Roles } from 'meteor/alanning:roles';
import { Users, Comments, Posts, PostsTypesEnum } from '/db';

const USERS = 10;
const POST_PER_USER = 20;
const COMMENTS_PER_POST = 10;
const COMMENT_TEXT_SAMPLES = ['Good', 'Bad', 'Neutral'];
const POST_TYPES = _.values(PostsTypesEnum);

const createUser = (email, password, roles) => {
    const userId = Accounts.createUser({ email, password });

    if (roles) Roles.addUsersToRoles(userId, roles);

    return Users.findOne(userId);
};

Meteor.startup(() => {
    if (Users.find().count() > 0) return;

    createUser('admin@app.com', '12345', 'ADMIN');

    let users = [];
    _.each(_.range(USERS), idx => {
        users.push(createUser(faker.internet.email(), '12345'));
    });

    _.each(users, user => {
        const userPostLink = Users.getLink(user, 'posts');

        _.each(_.range(POST_PER_USER), idx => {
            let post = {
                title: `User Post - ${idx}`,
                description: faker.lorem.sentences(30),
                type: _.sample(POST_TYPES)
            };

            userPostLink.add(post);
            const postCommentsLink = Posts.getLink(post, 'comments');

            _.each(_.range(COMMENTS_PER_POST), idx => {
                let comment = {
                    text: _.sample(COMMENT_TEXT_SAMPLES)
                };

                postCommentsLink.add(comment);
                Comments.getLink(comment, 'author').set(_.sample(users));
            });
        });
    });

    console.log('[ok] fixtures have been loaded.');
});
