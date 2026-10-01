const Booking = () => {
  return (
    <>
    <main>
      <section aria-label='booking' className='booking'>
          <article aria-label='booking copy'>
              <h2>Reserve a Table</h2>
              <p>Book your table online and enjoy a delicious meal at Little Lemon.</p>
          </article>
          <form aria-label='booking form' className='booking-form'>
              <label htmlFor='name'>Name</label>
              <input type='text' id='name' name='name' placeholder='Enter your name' required />
              <label htmlFor='email'>Email</label>
              <input type='email' id='email' name='email' placeholder='Enter your email' required />
              <label htmlFor='date'>Date</label>
              <input type='date' id='date' name='date' required />
              <label htmlFor='time'>Time</label>
              <input type='time' id='time' name='time' required />
              <label htmlFor='guests'>Number of Guests</label>
              <input type='number' id='guests' name='guests' min='1' max='20' placeholder='Enter number of guests' required />
              <label htmlFor='occasion'>Occasion</label>
              <select id='occasion' name='occasion' required>
                  <option value=''>Select an occasion</option>
                  <option value='birthday'>Birthday</option>
                  <option value='anniversary'>Anniversary</option>
                  <option value='date-night'>Date Night</option>
              </select>
              <button type='submit'>Book Now</button>
          </form>
      </section>
    </main>
    </>
  );
}

export default Booking;