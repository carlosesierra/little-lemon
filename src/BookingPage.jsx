import { useState } from 'react';
import Bookings from './Bookings';
import BookingForm from './BookingForm';

const BookingPage = ({ availableTimes, dispatch, submitForm }) => {
  const [selectedDate, setSelectedDate] = useState('');
  return (
    <main className='mt-0'>
      <Bookings
        availableTimes={availableTimes}
        selectedDate={selectedDate}
      />

      <BookingForm
        availableTimes={availableTimes}
        dispatch={dispatch}
        submitForm={submitForm}
        onDateChange={setSelectedDate}
      />
    </main>
  );
};

export default BookingPage;
