import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Posts, Comments } from '/db';
import { NewCommentForm, PostComments } from './../../components';

class PostView extends Component {
    constructor(props) {
        super(props);

        this.addNewComment = this.addNewComment.bind(this);
        this.removeComment = this.removeComment.bind(this);
    }

    componentDidMount() {
        Meteor.call('post.viewed', this.props.match.params._id);
    }

    addNewComment(comment) {
        Meteor.call('comment.create', comment, err => {
            if (err) {
                return alert(err.reason);
            }
            alert('Comment added!');
        });
    }

    removeComment(commentId) {
        Meteor.call('comment.remove', commentId, err => {
            if (err) {
                console.log(err.reason);
            }
        });
    }

    render() {
        const { post, comments, currentUser, loading } = this.props;
        if (loading) {
            return <div>Loading....</div>;
        }

        return (
            <div>
                <h2>{post.title}</h2>
                <p>{post.description}</p>
                <div>
                    Views: {post.views} Comments: {comments.length}
                </div>
                <NewCommentForm postId={post._id} submit={this.addNewComment} />
                <PostComments
                    post={post}
                    comments={comments}
                    currentUser={currentUser}
                    removeComment={this.removeComment}
                />
            </div>
        );
    }
}

PostView.displayName = 'PostView';

PostView.defaultProps = {
    post: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        views: PropTypes.number.isRequired
    }).isRequired,
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            text: PropTypes.string
        })
    )
};

export default withTracker(props => {
    const _id = props.match.params._id;
    const handle = Meteor.subscribe('post', _id);

    return {
        loading: !handle.ready(),
        post: Posts.findOne({ _id }),
        comments: Comments.find().fetch(),
        currentUser: Meteor.userId()
    };
})(PostView);
