import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withQuery } from 'meteor/cultofcoders:grapher-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Posts, Comments } from '/db';
import styled from 'styled-components';
import query from '/imports/api/posts/query/postComments.js';
import { NewCommentForm, PostComments } from './../../components';

const PostContent = styled.div`
    grid-column-start: 3;
`;

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
        const { data: post, currentUser, isLoading } = this.props;

        if (isLoading) {
            return <div>Loading....</div>;
        }

        console.log(post);

        return (
            <PostContent>
                <h2>{post.title}</h2>
                <p>{post.description}</p>
                <div>
                    Views: {post.views} Comments: {post.comments.length}
                </div>
                <NewCommentForm postId={post._id} submit={this.addNewComment} />
                <PostComments
                    post={post}
                    comments={post.comments}
                    currentUser={currentUser}
                    removeComment={this.removeComment}
                />
            </PostContent>
        );
    }
}

PostView.displayName = 'PostView';

PostView.defaultProps = {
    post: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        views: PropTypes.number.isRequired,
        comments: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string.isRequired,
                text: PropTypes.string
            })
        )
    }).isRequired
};

export default withQuery(
    ({ match: { params: { _id: postId } } }) => query.clone({ _id: postId }),
    {
        reactive: true,
        single: true
    }
)(PostView);
//
// export default withTracker(props => {
//     const _id = props.match.params._id;
//     const handle = Meteor.subscribe('post', _id);
//
//     return {
//         loading: !handle.ready(),
//         post: Posts.findOne({ _id }),
//         comments: Comments.find().fetch(),
//         currentUser: Meteor.userId()
//     };
// })(PostView);
