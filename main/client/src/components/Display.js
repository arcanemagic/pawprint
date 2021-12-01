import React, { useState } from 'react';
import Navbar from './Navbar';
import Dropdown from './Dropdown';

function Display() {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
           <Navbar toggle={toggle} />
           <Dropdown isOpen={isOpen} toggle={toggle} />
        </>
    );
}

export default Display;