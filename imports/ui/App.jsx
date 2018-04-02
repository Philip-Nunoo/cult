import React from 'react';
import PropTypes from 'prop-types';
import { Container, Header } from './components';

const rightNavigationItems = [{ name: 'Login' }];
const leftNavigationItems = [{ name: 'posts' }];

const App = ({ children }) => (
    <div className="app-container" id="app-container">
        <Header
            title="COC blog"
            rightNavigationItems={rightNavigationItems}
            leftNavigationItems={leftNavigationItems}
        />
        <Container>{children}</Container>
    </div>
);

App.propTypes = {
    children: PropTypes.node.isRequired
};

export default App;
