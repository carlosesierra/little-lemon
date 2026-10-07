import React, { useState } from 'react';

const BookingForm = ({ availableTimes, dispatch, submitForm }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState('Birthday');

const handleDateChange = (e) => {
  const selectedDate = e.target.value;

  setDate(selectedDate);
  setTime('');

  dispatch({
    type: 'UPDATE_TIMES',
    date: selectedDate,
  });
};

const handleSubmit = (e) => {
  e.preventDefault();

  const formData = {
    name,
    email,
    date,
    time,
    guests,
    occasion,
  };

  submitForm(formData);
};

  return (
    <section aria-label='Reserve a table' className='grid-container booking'>
      <article aria-label='booking copy'>
        <h2>Reserve a Table</h2>
        <p>Book your table online and enjoy a delicious meal at Little Lemon.</p>
      </article>

      <form className='booking-form' onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input 
          id='name' 
          type='text' 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />

        <label htmlFor='email'>Email</label>
        <input 
          id='email' 
          type='email' 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />

        <label htmlFor='res-date'>Choose Date</label>
        <input 
          id='res-date' 
          type='date' 
          value={date} 
          onChange={handleDateChange} 
          required 
        />

        <label htmlFor='res-time'>Choose Time</label>
        <select 
          id='res-time' 
          value={time} 
          onChange={(e) => setTime(e.target.value)} 
          required
        >
          <option value='' disabled>Select a time</option>
            {availableTimes.map((time) => (
            <option key={time} value={time}>
                {time}
            </option>
            ))}
        </select>

        <label htmlFor='guests'>Number of Guests</label>
        <input 
          id='guests' 
          type='number' 
          min='1' 
          max='10' 
          value={guests} 
          onChange={(e) => setGuests(Number(e.target.value))} 
          required 
        />

        <label htmlFor='occasion'>Occasion</label>
        <select 
          id='occasion' 
          value={occasion} 
          onChange={(e) => setOccasion(e.target.value)}
        >
          <option value='Birthday'>Birthday</option>
          <option value='Anniversary'>Anniversary</option>
          <option value='Engagement'>Engagement</option>
        </select>

        <input type='submit' value='Make Your Reservation' className='button'/>
      </form>

    </section>
  );
};

export default BookingForm;
