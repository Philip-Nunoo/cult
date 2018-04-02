import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

const AppHeader = ({ leftNavigationItems }) => (
    <Header>
        {leftNavigationItems && (
            <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
                {leftNavigationItems.map((navigationItem, idx) => (
                    <Menu.Item key={idx + 1}>{navigationItem.name}</Menu.Item>
                ))}
            </Menu>
        )}
    </Header>
);

AppHeader.propTypes = {
    title: PropTypes.string,
    leftNavigationItems: PropTypes.arrayOf(
        PropTypes.shape({ name: PropTypes.string.isRequired })
    ),
    rightNavigationItems: PropTypes.arrayOf(
        PropTypes.shape({ name: PropTypes.string.isRequired })
    )
};

export default AppHeader;
