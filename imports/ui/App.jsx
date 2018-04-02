import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Row, Col } from 'antd';
import { Container, Header } from './components';
const rightNavigationItems = [{ name: 'Login' }];
const leftNavigationItems = [{ name: 'posts' }];

import 'antd/dist/antd.css';

const App = ({ children }) => (
    <Layout className="layout">
        <Header
            title="COC blog"
            rightNavigationItems={rightNavigationItems}
            leftNavigationItems={leftNavigationItems}
        />
        <Container>
            <Row>
                <Col span={12} offset={6}>
                    {children}
                </Col>
            </Row>
        </Container>
    </Layout>
);

App.propTypes = {
    children: PropTypes.node.isRequired
};

export default App;
