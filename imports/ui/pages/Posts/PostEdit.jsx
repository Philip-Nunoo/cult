import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withQuery } from 'meteor/cultofcoders:grapher-react';
import PropTypes from 'prop-types';
import { Button, notification } from 'antd';
import { AutoForm, AutoField, LongTextField, ErrorsField } from 'uniforms-antd';
import styled from 'styled-components';
import PostSchema from '/db/posts/schema';
import query from '/imports/api/posts/query/postEdit';

const PostContent = styled.div`
    background: #fff;
    padding: 24px;
    min-height: 280px;
    margin-bottom: 20px;
`;

class PostEdit extends React.Component {
    constructor(props) {
        super(props);
    }

    submit = post => {
        Meteor.call('post.edit', this.props.match.params._id, post, err => {
            if (err) {
                return notification.error({
                    message: 'Error updating post',
                    description: err.reason
                });
            }
            notification.success({
                message: 'Success',
                description: 'Post modified!'
            });
        });
    };

    render() {
        const { data: post, isLoading } = this.props;

        if (isLoading) {
            return <div>Loading....</div>;
        }

        return (
            <PostContent className="post">
                <AutoForm
                    onSubmit={this.submit}
                    schema={PostSchema}
                    model={post}
                >
                    <AutoField name="title" />
                    <LongTextField name="description" />
                    <AutoField name="type" />

                    <ErrorsField />
                    <Button type="primary" htmlType="submit">
                        Update post
                    </Button>
                </AutoForm>
            </PostContent>
        );
    }
}

PostEdit.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({ _id: PropTypes.string.isRequired })
    }).isRequired,
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
    isLoading: PropTypes.bool.isRequired
};

export default withQuery(
    ({ match: { params: { _id: postId } } }) => query.clone({ _id: postId }),
    {
        reactive: true,
        single: true
    }
)(PostEdit);
