import { useState } from 'react';

import logo from './logo.svg';

const MenuLinks = () => {
    return (
        <>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#reservations">Reservations</a></li>
            <li><a href="#order-online">Order Online</a></li>
            <li><a href="#login">Login</a></li>
        </>
    );
}


const Nav = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

  return (
    <>
    <nav>
         <figcaption aria-label='logo'>
            <img src={logo} alt='logo' id='#logo'/>
        </figcaption>
          <ul className='menu-desktop'>
            <MenuLinks />
          </ul>
          <button onClick={toggleMenu}>{isOpen ? 'Close' : 'Menu'}</button>
          
    </nav>
    {isOpen && (
        <ul className='menu-mobile'>
            <MenuLinks />
        </ul>
    )}
    </>
  );
}

export default Nav;
