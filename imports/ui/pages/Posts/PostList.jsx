import React from 'react';
import { Route, Link, MemoryRouter } from 'react-router-dom';

export default class PostList extends React.Component {
    constructor() {
        super();
        this.state = { posts: null };
    }

    componentDidMount() {
        Meteor.call('post.list', (err, posts) => {
            this.setState({ posts });
        });
    }

    render() {
        const { posts } = this.state;
        const { history } = this.props;

        if (!posts) {
            return <div>Loading....</div>;
        }

        return (
            <div className="post">
                {posts.map(post => {
                    return (
                        <Link to={`/posts/view/${post._id}`} key={post._id}>
                            <p>Post id: {post._id} </p>
                            <p>
                                Post title: {post.title}, Post Description:{' '}
                                {post.description}{' '}
                            </p>
                            <button
                                onClick={() => {
                                    history.push('/posts/edit/' + post._id);
                                }}
                            >
                                {' '}
                                Edit post
                            </button>
                        </Link>
                    );
                })}
                <button onClick={() => history.push('/posts/create')}>
                    Create a new post
                </button>
            </div>
        );
    }
}
