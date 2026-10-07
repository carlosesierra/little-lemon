import { Link, useLocation } from 'react-router-dom';

const BookingConfirmed = () => {
    const { state } = useLocation();
    const booking = state?.booking;

    if (state?.confirmed !== true || !booking) {
      return (
        <main>
          <section className='grid-container booking'>
            <article>
              <h2>No reservation to display</h2>
              <p>Submit the booking form to receive confirmation.</p>

              <Link to='/booking' className='button'>
                Reserve a Table
              </Link>
            </article>
          </section>
        </main>
      );
    }

    return (
      <main>
        <section
          className='grid-container booking'
          aria-labelledby='confirmation-heading'
        >
          <article>
            <h2 id='confirmation-heading'>
              Booking has been confirmed!
            </h2>

            <p>Thank you for choosing Little Lemon.</p>

            {state.warning && (
              <p role='status'>{state.warning}</p>
            )}

            <dl>
              <dt>Name</dt>
              <dd>{booking.name}</dd>

              <dt>Date</dt>
              <dd>{booking.date}</dd>

              <dt>Time</dt>
              <dd>{booking.time}</dd>

              <dt>Guests</dt>
              <dd>{booking.guests}</dd>

              <dt>Occasion</dt>
              <dd>{booking.occasion}</dd>
            </dl>

            <p>Keep these details for your records.</p>

            <Link to='/' className='button'>
              Back to Home
            </Link>
            <p>
              Need to change or cancel your reservation?{' '}
              <a href='#booking-help'>See booking help.</a>
            </p>
          </article>
        </section>
      </main>
    );
};

export default BookingConfirmed;