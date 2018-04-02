import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { withQuery } from 'meteor/cultofcoders:grapher-react';
import query from '/imports/api/posts/query/postList';

const PostsContent = styled.div`
    grid-column-start: 3;
`;

const PostItem = styled(Link)`
    text-decoration: none;
    display: block;
    color: #000;
    background-color: #fff;
    padding: 1.5em;
    margin: 1em 0em;
    box-shadow: 1px 1px 3px;
`;

const PostTitle = styled.h1`
    margin-top: 0px;
`;

const PostList = ({ history, data: posts, isLoading, error }) => {
    if (isLoading) {
        return <div>Loading....</div>;
    }

    if (error) {
        return <div>Error: {error.reason}</div>;
    }

    return (
        <PostsContent>
            <button onClick={history.push('/posts/create')}>
                Create a new post
            </button>
            {posts.map(post => {
                return (
                    <PostItem to={`/posts/view/${post._id}`} key={post._id}>
                        <PostTitle>{post.title}</PostTitle>
                        {post.views} views {post.comments.length} comments
                    </PostItem>
                );
            })}
        </PostsContent>
    );
};

PostList.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            title: PropTypes.string,
            author: PropTypes.shape({
                _id: PropTypes.string.isRequired,
                emails: PropTypes.arrayOf(
                    PropTypes.shape({ address: PropTypes.string.isRequired })
                )
            }).isRequired,
            comments: PropTypes.arrayOf(
                PropTypes.shape({
                    _id: PropTypes.string.isRequired,
                    userId: PropTypes.string.isRequired
                })
            ).isRequired
        })
    ).isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.shape({ reason: PropTypes.string })
};

export default withQuery(() => query.clone(), { reactive: true })(PostList);
