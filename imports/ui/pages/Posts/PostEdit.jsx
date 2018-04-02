import React from 'react';
import Meteor from 'meteor/meteor';
import PropTypes from 'prop-types';
import {
    AutoForm,
    AutoField,
    LongTextField,
    ErrorsField
} from 'uniforms-unstyled';
import PostSchema from '/db/posts/schema';

class PostEdit extends React.Component {
    constructor() {
        super();
        this.state = { post: null };
    }

    componentDidMount() {
        Meteor.call('post.get', this.props.match.params._id, (err, post) => {
            this.setState({ post });
        });
    }

    submit = post => {
        Meteor.call('post.edit', this.props.match.params._id, post, err => {
            if (err) {
                return alert(err.reason);
            }
            alert('Post modified!');
        });
    };

    render() {
        const { history } = this.props;
        const { post } = this.state;

        if (!post) {
            return <div>Loading....</div>;
        }

        return (
            <div className="post">
                <AutoForm
                    onSubmit={this.submit}
                    schema={PostSchema}
                    model={post}
                >
                    <AutoField name="title" />
                    <LongTextField name="description" />
                    <AutoField name="type" />

                    <ErrorsField />
                    <button type="submit">Edit post</button>
                    <button onClick={history.push('/posts')}>
                        Back to posts
                    </button>
                </AutoForm>
            </div>
        );
    }
}

PostEdit.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({ _id: PropTypes.string.isRequired })
    }).isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
};

export default PostEdit;
