import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, notification } from 'antd';
import { AutoForm, AutoField, LongTextField, ErrorsField } from 'uniforms-antd';
import PostSchema from '/db/posts/schema';

class PostCreate extends React.Component {
    constructor(props) {
        super(props);
    }

    submit = post => {
        Meteor.call('post.create', post, err => {
            if (err) {
                return notification.error({
                    message: 'Error creating post',
                    description: err.reason
                });
            }
            notification.success({
                message: 'Success',
                description: 'Post created'
            });
        });
    };

    render() {
        let formRef;
        return (
            <AutoForm
                ref={form => (formRef = form)}
                onSubmit={this.submit}
                schema={PostSchema}
                style={{
                    backgroundColor: '#fff',
                    padding: 24,
                    marginBottom: 15
                }}
            >
                <AutoField name="title" />
                <LongTextField name="description" />
                <AutoField name="type" />

                <ErrorsField />
                <Button type="primary" onClick={() => formRef.submit()}>
                    Add post
                </Button>
            </AutoForm>
        );
    }
}

export default PostCreate;
