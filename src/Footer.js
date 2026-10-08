import { Link } from 'react-router-dom';
import logo from './logo.svg';

const contact = {
  address: '123 Mediterranean Avenue Chicago, IL',
  phone: '(555) 123-4567',
  email: 'info@littlelemon.com',
};

const Footer = () => {
  const hasContactDetails =
    contact.address || contact.phone || contact.email;

  return (
    <footer className='bg-green'>
      <section
        aria-label='Footer information'
        className='grid-container max-w-1200'
      >
        {/* <figure>
            
            <figcaption>Little<br/>Lemon</figcaption>
        </figure> */}
        <figure>
          <img src={logo} alt='Little Lemon' id='#logo'/>
          <figcaption>Little<br/>Lemon</figcaption>
        </figure>

        <article className='color-light'>
          <h3>Menu</h3>

          <nav aria-label='Footer navigation'>
            <ul>
              <li>
                <Link to='/' className='color-light'>
                  Home
                </Link>
              </li>
              <li>
                <a href='/#about' className='color-light'>
                  About
                </a>
              </li>
              <li>
                <Link to='/booking' className='color-light'>
                  Reservations
                </Link>
              </li>
            </ul>
          </nav>
        </article>

        <article className='color-light'>
          <h3>Contact</h3>

          {hasContactDetails ? (
            <address>
              {contact.address && <p>{contact.address}</p>}

              {contact.phone && (
                <p>
                  <a
                    href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}
                    className='color-light'
                  >
                    {contact.phone}
                  </a>
                </p>
              )}

              {contact.email && (
                <p>
                  <a
                    href={`mailto:${contact.email}`}
                    className='color-light'
                  >
                    {contact.email}
                  </a>
                </p>
              )}
            </address>
          ) : (
            <p>Contact details will be added before launch.</p>
          )}
        </article>

        <article className='color-light' id='booking-help'>
          <h3>Booking help</h3>
          <p>Reservations support between 1 and 10 guests.</p>

          {hasContactDetails ? (
            <p>
              For changes, cancellations or booking problems,
              contact us with your name, reservation date and time.
            </p>
          ) : (
            <p>
              Change and cancellation assistance will be available
              when our contact details are published.
            </p>
          )}
        </article>
      </section>
    </footer>
  );
};

export default Footer;