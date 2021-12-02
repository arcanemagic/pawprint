import React, { useState } from 'react';
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
    background: ${props => props.navscroll ? "linear-gradient(90deg, rgb(168, 103, 39) 0%, rgb(207,137,68) 100%)" : "transparent"};
`;

const NavLink = css`
    color: #003B5C;
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

const NavMenuLinks = styled.a`
    ${NavLink}
`;

const Navbar = ({toggle}) => {

    const state = localStorage.getItem("loggedIn") === "true";
    const [navbar, setNavbar] = useState(false);

    const logout = () => {
        if(localStorage.getItem("loggedIn") === "true"){
            localStorage.setItem("loggedIn", "false");
            localStorage.removeItem("username");
            alert("successfully logged out!")
            window.location.reload(false);
          }else{
            alert("You are not logged in yet")
          }
    };

    const changeBackground = () => {
        if (window.scrollY >= 20) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    };

    window.addEventListener('scroll', changeBackground);

    return (
        <Nav navscroll={navbar}>
            <Logo to='/'><img src={HeaderLogo} />PawPrint</Logo>
            <MenuBars onClick={toggle} />
            <NavMenu>
                <NavMenuLinks href='/'>Home</NavMenuLinks>
                <NavMenuLinks href='/post'>PawPrinsta</NavMenuLinks>
                { state ? 
                   (<>
                      <NavMenuLinks href='/profile'>Profile</NavMenuLinks>
                      <NavMenuLinks onClick={logout} href= '/' >Logout</NavMenuLinks>
                    </>
                   ) 
                   :
                   (<> 
                     <NavMenuLinks href='/register'>Register</NavMenuLinks>
                     <NavMenuLinks href='/login'>Login</NavMenuLinks>
                    </>
                   )
                }
            </NavMenu>
        </Nav>
    );
}

export default Navbar;
