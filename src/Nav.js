import { useState } from 'react';

import logo from './logo.svg';

const MenuLinks = () => {
    return (
        <>
            <li><a href='/'>Home</a></li>
            <li><a href='#about'>About</a></li>
            <li><a href='booking'>Reservations</a></li>
            <li><a href='#order-online'>Order Online</a></li>
            <li><a href='#login'>Login</a></li>
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
    <nav className='grid-container'>
        <img src={logo} alt='Little Lemon' id='#logo'/>
          <ul className='menu-desktop'>
            <MenuLinks />
          </ul>
          <button
            type='button'
            onClick={toggleMenu}
            aria-expanded={isOpen}
            >
            {isOpen ? 'Close menu' : 'Open menu'}
        </button>
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
