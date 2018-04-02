import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PostComment = styled.div`
    background: #fff;
    padding: 24px;
    margin-bottom: 15px;
`;

const PostComments = ({ post, comments, currentUser, removeComment }) => {
    const renderButton = comment => {
        return currentUser === comment.userId || currentUser === post.userId;
    };

    return (
        <div>
            {comments.map(comment => (
                <PostComment key={comment._id}>
                    <strong>Created By: {comment.author._id}</strong>
                    <small>Created At: {comment.createdAt}</small>
                    <p>{comment.text}</p>
                    {renderButton(comment, currentUser) && (
                        <button onClick={() => removeComment(comment._id)}>
                            x
                        </button>
                    )}
                </PostComment>
            ))}
        </div>
    );
};

PostComments.propTypes = {
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired
        })
    ).isRequired,
    post: PropTypes.shape({ userId: PropTypes.string.isRequired }),
    currentUser: PropTypes.string,
    removeComment: PropTypes.func.isRequired
};

PostComments.defaultProps = {
    currentUser: ''
};

export default PostComments;
