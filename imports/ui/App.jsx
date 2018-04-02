import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Layout, Row, Col } from 'antd';
import { Container, Header } from './components';

import 'antd/dist/antd.css';

const App = ({ children }) => {
    const currentUser = Meteor.userId();

    const childrenWithProps = React.Children.map(children, child =>
        React.cloneElement(child, { currentUser })
    );

    const publicNavigationItems = [
        { name: 'Login', link: '/login' },
        { name: 'Register', link: '/register' }
    ];

    const privateNavigationItems = [
        { name: 'Create Post', link: '/posts/create' },
        { name: 'Sign out', link: '/logout' }
    ];

    const leftNavigationItems = [
        { name: 'Home', link: '/' },
        { name: 'Posts', link: '/posts' }
    ];

    return (
        <Layout className="layout">
            <Header
                title="COC blog"
                leftNavigationItems={leftNavigationItems}
                rightNavigationItems={
                    currentUser ? privateNavigationItems : publicNavigationItems
                }
            />
            <Container>
                <Row>
                    <Col span={12} offset={6}>
                        {childrenWithProps}
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

App.propTypes = {
    children: PropTypes.node.isRequired
};

export default App;
