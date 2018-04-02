import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import {
    AutoForm,
    AutoField,
    LongTextField,
    ErrorsField
} from 'uniforms-unstyled';
import PostSchema from '/db/posts/schema';

class PostCreate extends React.Component {
    constructor() {
        super();
    }

    submit = post => {
        Meteor.call('post.create', post, err => {
            if (err) {
                return alert(err.reason);
            }
            alert('Post added!');
        });
    };

    render() {
        const { history } = this.props;

        return (
            <div className="post">
                <AutoForm onSubmit={this.submit} schema={PostSchema}>
                    <AutoField name="title" />
                    <LongTextField name="description" />
                    <AutoField name="type" />

                    <ErrorsField />
                    <button type="submit">Add post</button>
                    <button onClick={history.push('/posts')}>
                        Back to posts
                    </button>
                </AutoForm>
            </div>
        );
    }
}

PostCreate.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
};

export default PostCreate;
