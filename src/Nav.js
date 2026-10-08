import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from './logo.svg';


const MenuLinks = ({ onNavigate }) => {
  const linkClass = ({ isActive }) =>
    isActive ? 'nav-link active' : 'nav-link';

  return (
    <>
      <li>
        <NavLink
          to='/'
          end
          className={linkClass}
          onClick={onNavigate}
        >
          Home
        </NavLink>
      </li>

      <li>
        <a href='/#about' onClick={onNavigate}>
          About
        </a>
      </li>

      <li>
        <NavLink
          to='/booking'
          className={linkClass}
          onClick={onNavigate}
        >
          Reservations
        </NavLink>
      </li>
    </>
  );
};


const Nav = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

  return (
    <>
    <nav className='grid-container max-w-1200'>
        <img src={logo} alt='Little Lemon' id='#logo'/>
          <ul className='menu-desktop'>
            <MenuLinks onNavigate={() => setIsOpen(false)} />
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
            <MenuLinks onNavigate={() => setIsOpen(false)} />
        </ul>
    )}
    </>
  );
}

export default Nav;
