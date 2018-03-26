import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PostView extends Component {
    constructor() {
        super();
        this.state = { post: null };
    }

    componentDidMount() {
        Meteor.call('post.get', this.props.match.params._id, (err, post) => {
            this.setState({ post });
        });

        Meteor.call('post.viewed', this.props.match.params._id);
    }

    render() {
        const { post } = this.state;
        if (!post) {
            return <div>Loading....</div>;
        }

        return (
            <div>
                post
                <h2>{post.title}</h2>
                <p>{post.description}</p>
            </div>
        );
    }
}

PostView.displayNmae = 'PostView';

PostView.defaultProps = {
    post: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }).isRequired
};

export default PostView;
