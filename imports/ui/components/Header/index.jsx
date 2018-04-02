import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const AppHeader = ({ leftNavigationItems, rightNavigationItems }) => (
    <Header>
        {leftNavigationItems && (
            <Menu
                theme="dark"
                mode="horizontal"
                style={{ lineHeight: '64px', float: 'left' }}
            >
                {leftNavigationItems.map((navigationItem, idx) => (
                    <Menu.Item key={idx + 1}>
                        <Link to={navigationItem.link}>
                            {navigationItem.name}
                        </Link>
                    </Menu.Item>
                ))}
            </Menu>
        )}
        {rightNavigationItems && (
            <Menu
                theme="dark"
                mode="horizontal"
                style={{ lineHeight: '64px', float: 'right' }}
            >
                {rightNavigationItems.map((navigationItem, idx) => (
                    <Menu.Item key={idx + 1} sytl>
                        <Link to={navigationItem.link}>
                            {navigationItem.name}
                        </Link>
                    </Menu.Item>
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
