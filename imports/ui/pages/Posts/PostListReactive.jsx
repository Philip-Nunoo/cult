import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Posts } from '/db';

class PostListReactive extends React.Component {
    constructor() {
        super();
    }

    render() {
        const { posts, history } = this.props;

        if (!posts) {
            return <div>Loading....</div>;
        }

        return (
            <div className="post">
                {posts.map(post => {
                    return (
                        <div key={post._id}>
                            <p>Post id: {post._id} </p>
                            <p>
                                Post title: {post.title}, Post Description:{' '}
                                {post.description}{' '}
                            </p>
                            <button
                                onClick={history.push(
                                    `/posts/edit/${post._id}`
                                )}
                            >
                                Edit post
                            </button>
                        </div>
                    );
                })}
                <button onClick={history.push('/posts/create')}>
                    Create a new post
                </button>
            </div>
        );
    }
}

PostListReactive.propTypes = {
    posts: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string
    }).isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    })
};

export default withTracker(props => {
    const handle = Meteor.subscribe('posts');

    return {
        loading: !handle.ready(),
        posts: Posts.find().fetch(),
        ...props
    };
})(PostListReactive);
