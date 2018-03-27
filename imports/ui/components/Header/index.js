import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const HeaderWrapper = styled.header`
    display: flex;
    align-items: center;
    height: 50px;
    background-color: #db7093;
    color: #fff;
`;

const NavLink = styled.a`
    text-transform: uppercase;
    text-decoration: none;
    color: #cdd0d0;
    padding: 20px;
    display: inline-block;
`;

const TitleLink = styled(NavLink)`
    text-decoration: none;
    color: white;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 3px;
    padding: 10px;
`;

const RightNav = styled.div`
    margin-left: auto;
    display: flex;
    align-items: center;
    margin-right: 10px;
`;

const LeftNav = styled.div``;

const NavList = styled.ul`
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
`;

const NavItem = styled.li``;
const Header = ({ title, rightNavigationItems, leftNavigationItems }) => (
    <HeaderWrapper>
        {title && <TitleLink>{title}</TitleLink>}
        {leftNavigationItems && (
            <LeftNav>
                <NavList>
                    {leftNavigationItems.map((navigationItem, idx) => (
                        <NavItem key={idx}>
                            <NavLink>{navigationItem.name}</NavLink>
                        </NavItem>
                    ))}
                </NavList>
            </LeftNav>
        )}
        {rightNavigationItems && (
            <RightNav>
                {rightNavigationItems.map((navigationItem, idx) => (
                    <NavLink key={idx}>{navigationItem.name}</NavLink>
                ))}
            </RightNav>
        )}
    </HeaderWrapper>
);

Header.propTypes = {
    title: PropTypes.string,
    rightNavigationItems: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired
        })
    )
};

export default Header;
