import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withQuery } from 'meteor/cultofcoders:grapher-react';
import query from '/imports/api/posts/query/postList';
import { List, Icon } from 'antd';
import { Loading } from './../../components';

const PostsContent = styled.div`
    background: #fff;
    padding: 24px;
    min-height: 280px;
`;

const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);

IconText.propTypes = {
    type: PropTypes.string.isRequired,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

const PostList = ({ data: posts, isLoading, history, error }) => {
    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <div>Error: {error.reason}</div>;
    }

    const pagination = {
        pageSize: 10,
        current: 1,
        total: posts.length,
        onChange: () => {}
    };

    const getSumary = text => {
        const rgxwords = new RegExp('([^ ]*[ ]{0,1}){1,' + 20 + '}', 'g');
        text = text.replace(/\s\s+/g, ' '); // replace multiple whitespaces whit single space
        return `${text.match(rgxwords)[0]} ...`;
    };

    const renderPost = post => (
        <List.Item
            key={post._id}
            actions={[
                <IconText key="video-camera" type="like-o" text={post.views} />,
                <IconText
                    key="comments"
                    type="message"
                    text={post.comments.length}
                />
            ]}
            onClick={() => history.push(`/posts/view/${post._id}`)}
        >
            <List.Item.Meta
                title={post.title}
                description={getSumary(post.description)}
            />
        </List.Item>
    );

    return (
        <PostsContent>
            <List
                itemLayout="vertical"
                size="large"
                pagination={pagination}
                dataSource={posts}
                renderItem={renderPost}
            />
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
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.shape({ reason: PropTypes.string }),
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
};

export default withQuery(() => query.clone(), { reactive: true })(PostList);
