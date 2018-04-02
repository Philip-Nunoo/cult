import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { notification } from 'antd';
import PropTypes from 'prop-types';
import { withQuery } from 'meteor/cultofcoders:grapher-react';
import styled from 'styled-components';
import query from '/imports/api/posts/query/postComments.js';
import { NewCommentForm, PostComments, Loading } from './../../components';

const PostContent = styled.div`
    background: #fff;
    padding: 24px;
    min-height: 280px;
    margin-bottom: 20px;
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
                return notification.error({
                    message: 'Error creating comment',
                    description: err.reason
                });
            }
            notification.success({
                message: 'Success',
                description: 'Comment created'
            });
        });
    }

    removeComment(commentId) {
        Meteor.call('comment.remove', commentId, err => {
            if (err) {
                notification.error({
                    message: 'Error creating comment',
                    description: err.reason
                });
            }
        });
    }

    render() {
        const { data: post, isLoading } = this.props;

        if (isLoading) {
            return <Loading />;
        }

        const currentUser = Meteor.userId();

        return (
            <div>
                <PostContent>
                    <h1>{post.title}</h1>
                    <p>{post.description}</p>
                    <div>
                        Views: {post.views} Comments: {post.comments.length}
                    </div>
                </PostContent>

                <NewCommentForm postId={post._id} submit={this.addNewComment} />
                <PostComments
                    post={post}
                    comments={post.comments}
                    currentUser={currentUser}
                    removeComment={this.removeComment}
                />
            </div>
        );
    }
}

PostView.propTypes = {
    data: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        views: PropTypes.number.isRequired,
        comments: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string.isRequired,
                text: PropTypes.string
            })
        )
    }),
    match: PropTypes.shape({
        params: PropTypes.shape({ _id: PropTypes.string.isRequired }).isRequired
    }).isRequired,
    currentUser: PropTypes.string,
    isLoading: PropTypes.bool.isRequired
};

export default withQuery(
    ({ match: { params: { _id: postId } } }) => query.clone({ _id: postId }),
    {
        reactive: true,
        single: true
    }
)(PostView);
