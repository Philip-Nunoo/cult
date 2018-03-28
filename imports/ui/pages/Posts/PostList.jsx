import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Route, Link, MemoryRouter } from 'react-router-dom';
import { Posts, Users, Comments } from '/db';

class PostList extends React.Component {
    constructor() {
        super();
    }

    render() {
        const { posts, history, comments, users, loading } = this.props;

        if (loading) {
            return <div>Loading....</div>;
        }

        const getComments = id =>
            comments.filter(({ postId }) => postId === id);

        const getUserEmail = userId =>
            users.find(({ _id }) => _id === userId).emails[0].address;

        return (
            <div className="post">
                {posts.map(post => {
                    return (
                        <Link to={`/posts/view/${post._id}`} key={post._id}>
                            <p>Post id: {post._id}</p>
                            <p>Post title: {post.title}</p>
                            <p>Post Description: {post.description}</p>
                            <div>
                                Views: {post.views} comments:{' '}
                                {getComments(post._id).length} created By:{' '}
                                {getUserEmail(post.userId)}
                            </div>
                            <button
                                onClick={() => {
                                    history.push('/posts/edit/' + post._id);
                                }}
                            >
                                Edit post
                            </button>
                        </Link>
                    );
                })}
                <button onClick={() => history.push('/posts/create')}>
                    Create a new post
                </button>
            </div>
        );
    }
}

PostList.propTypes = {
    posts: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            title: PropTypes.string,
            description: PropTypes.string,
            userId: PropTypes.string.isRequired
        })
    ).isRequired,
    users: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            emails: PropTypes.arrayOf(
                PropTypes.shape({
                    address: PropTypes.string.isRequired
                })
            )
        })
    ).isRequired,
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            userId: PropTypes.string.isRequired,
            postId: PropTypes.string.isRequired
        })
    ).isRequired
};

export default withTracker(props => {
    const handle = Meteor.subscribe('posts');

    return {
        loading: !handle.ready(),
        posts: Posts.find().fetch(),
        users: Users.find({}, { fields: { emails: 1 } }).fetch(),
        comments: Comments.find(
            {},
            { fields: { createdAt: 1, userId: 1, postId: 1 } }
        ).fetch(),
        ...props
    };
})(PostList);
