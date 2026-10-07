import React from 'react';

const BookingConfirmed = () => {
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
        </article>
      </section>
    </main>
  );
};

export default BookingConfirmed;