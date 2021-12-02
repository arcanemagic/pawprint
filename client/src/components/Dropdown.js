import React from 'react';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';


const DropdownContainer = styled.div`
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 100%;
    background: #cd853f;
    display: grid;
    align-items: center;
    left: 0;
    transition: 0.3s ease-in-out;
    opacity: ${({isOpen}) => (isOpen ? '1' : '0')};
    top: ${({isOpen}) => (isOpen ? '0' : '-100%')};
`;

const Icon = styled.div`
    position: absolute;
    top: 1.2rem;
    right: 1.5rem;
    background: transparent;
    font-size: 2rem;
    cursor: pointer;
    outline: none;
`;

const CloseIcon = styled(FaTimes)`
    color: #000d1a;
`;

const DropdownWrapper = styled.div``;

const DropdownMenu = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, 80px);
    text-align: center;
    margin-bottom: 4rem;

    @media screen and (max-width: 480) {
        grid-template-rows: repeat(6, 60px);
    }
`;

const DropdownLinks = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 1.5rem;
    text-decoration: none;
    list-style: none;
    cursor: pointer;
    transition: 0.2s ease-in-out;

    &:hover {
        color: #000d1a;
    }

`;

const Dropdown = ({isOpen, toggle}) => {

    const state = localStorage.getItem("loggedIn") === "true";

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

    return (
        <DropdownContainer isOpen={isOpen} onClick={toggle}>
            <Icon onClick={toggle}>
                <CloseIcon />
            </Icon>
            <DropdownWrapper>
                <DropdownMenu>
                    <DropdownLinks href='/'>Home</DropdownLinks>
                    <DropdownLinks href='/post'>PawPrinsta</DropdownLinks>
                    { state ? 
                   (<>
                      <DropdownLinks href='/profile'>Profile</DropdownLinks>
                      <DropdownLinks onClick={logout} href= '/' >Logout</DropdownLinks>
                    </>
                   ) 
                   :
                   (<> 
                     <DropdownLinks href='/register'>Register</DropdownLinks>
                     <DropdownLinks href='/login'>Login</DropdownLinks>
                    </>
                   )
                }
                </DropdownMenu>
            </DropdownWrapper>
        </DropdownContainer>
    )
}

export default Dropdown;
