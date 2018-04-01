import React from 'react';
import PropTypes from 'prop-types';

const PostComments = ({ post, comments, currentUser, removeComment }) => {
    const renderButton = (comment, currentUserId) => {
        return currentUser === comment.userId || currentUser === post.userId;
    };

    return (
        <div>
            {comments.map((comment, idx) => (
                <div key={comment._id}>
                    <p>{comment.text}</p>
                    <strong>Created By: {comment.author._id}</strong>
                    {renderButton(comment, currentUser) && (
                        <button onClick={() => removeComment(comment._id)}>
                            x
                        </button>
                    )}
                </div>
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
    currentUser: PropTypes.string,
    removeComment: PropTypes.func.isRequired
};

PostComments.defaultProps = {
    currentUser: ''
};

export default PostComments;
