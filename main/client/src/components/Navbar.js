import React from 'react';
import styled, { css } from 'styled-components/macro';
import { Link } from 'react-router-dom';
import Bars from '../images/bars.svg';
import HeaderLogo from "../images/pawprint_logo.png";

const Nav = styled.nav`
    height: 90;
    display: flex;
    justify-content: space-between;
    padding: 1rem 2rem;
    z-index: 100;
    position: fixed;
    width: 100%;
`;

const NavLink = css`
    color: #fff;
    display: flex;
    align-items: center;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    text-decoration: none;
`;

const Logo = styled(Link)`
    ${NavLink}
    font-weight: 700;
    font-size: 2rem;

    img {
        padding: 4px; 
        width: 86px;
    }
`;

const MenuBars = styled.i`
    display: none;

    @media screen and (max-width: 768px) {
        display: block;
        background-image: url(${Bars});
        background-size: contain;
        height: 60px;
        width: 60px;
        cursor: pointer;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-50%, 25%);
    }
`;

const NavMenu = styled.div`
    display: flex;
    align-items: center;

    @media screen and (max-width: 768px) {
        display: none;
    }
`;

const NavMenuLinks = styled(Link)`
    ${NavLink}
`;

const NavBtn = styled.div`
    display: flex;
    align-items;
    margin-right: 24px;

    @media screen and (max-width: 768px) {
        display: none;
    }
`;

const Navbar = ({toggle}) => {
    const logout = () =>{
        localStorage.setItem("loggedIn", false);
        localStorage.removeItem("username");
        alert("Successfully logged out!")
    }

    return (
        <Nav>
            <Logo to='/'><img src={HeaderLogo} />PawPrint</Logo>
            <MenuBars onClick={toggle} />
            <NavMenu>
                <NavMenuLinks to='/'>Home</NavMenuLinks>
                <NavMenuLinks to='/post'>PawPrinsta</NavMenuLinks>
                <NavMenuLinks to='/register'>Register</NavMenuLinks>
                <NavMenuLinks to='/login'>Login</NavMenuLinks>
                <NavMenuLinks to='/' onClick={logout}>Logout</NavMenuLinks>
                <NavMenuLinks to='/profile'>Profile</NavMenuLinks>
            </NavMenu>
        </Nav>
    );
}

export default Navbar;
