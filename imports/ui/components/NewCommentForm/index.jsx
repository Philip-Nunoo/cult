import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AutoForm, LongTextField } from 'uniforms-antd';
import { Button } from 'antd';
import CommentSchema from '/db/comments/schema';

class NewCommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            commentModel: this.props.comment || {}
        };
    }

    componentWillMount() {
        if (this.props.postId) {
            this.setState({
                commentModel: {
                    ...this.state.commentModel,
                    postId: this.props.postId
                }
            });
        }
    }

    render() {
        let formRef;
        return (
            <AutoForm
                style={{
                    backgroundColor: '#fff',
                    padding: 24,
                    marginBottom: 15
                }}
                ref={form => (formRef = form)}
                onSubmit={comment => {
                    this.props.submit(comment);
                    this.setState({ commentModel: this.state.commentModel });
                }}
                schema={CommentSchema}
                model={this.state.commentModel}
            >
                <LongTextField name="text" />
                <Button type="primary" onClick={() => formRef.submit()}>
                    Add Comment
                </Button>
            </AutoForm>
        );
    }
}

NewCommentForm.propTypes = {
    comment: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        postId: PropTypes.string.isRequired
    }),
    submit: PropTypes.func.isRequired,
    postId: PropTypes.string
};

export default NewCommentForm;
