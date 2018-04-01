import React from 'react';
import Grid from 'react-css-grid';
import { Container, Header } from './components';

const rightNavigationItems = [{ name: 'Login' }];
const leftNavigationItems = [{ name: 'posts' }];

export default ({ children }) => (
    <div className="app-container" id="app-container">
        <Header
            title="COC blog"
            rightNavigationItems={rightNavigationItems}
            leftNavigationItems={leftNavigationItems}
        />
        <Container>{children}</Container>
    </div>
);
