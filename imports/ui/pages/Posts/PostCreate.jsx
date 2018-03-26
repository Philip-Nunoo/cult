import React from 'react';
import {
    AutoForm,
    AutoField,
    LongTextField,
    SelectField,
    ErrorsField
} from 'uniforms-unstyled';
import PostSchema from '/db/posts/schema';
import SimpleSchema2Bridge from 'uniforms/SimpleSchema2Bridge';

export const SchemaBridge = new SimpleSchema2Bridge(PostSchema);

export default class PostCreate extends React.Component {
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
                <AutoForm onSubmit={this.submit} schema={SchemaBridge}>
                    <AutoField name="title" />
                    <LongTextField name="description" />
                    <AutoField name="type" />

                    <ErrorsField />
                    <button type="submit">Add post</button>
                    <button onClick={() => history.push('/posts')}>
                        Back to posts
                    </button>
                </AutoForm>
            </div>
        );
    }
}
