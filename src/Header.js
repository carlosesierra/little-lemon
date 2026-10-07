import { useLocation } from 'react-router-dom';
import Nav from './Nav.js';
import Hero from './Hero.js';

const Header = () => {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  const title =
    pathname === '/booking-confirmed'
      ? 'Booking confirmation'
      : 'Reserve a table';

  return (
    <>
      <Nav />

      {isHome ? (
        <Hero />
      ) : (
        <header className='grid-container page-header'>
          <div>
            <h1>{title}</h1>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
