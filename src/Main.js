/* global fetchAPI, submitAPI */

import { useReducer } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './Home.js';
import BookingPage from './BookingPage.jsx';
import BookingConfirmed from './BookingConfirmed';

export function initializeTimes() {
  const today = new Date();

  return fetchAPI(today);
}

export function updateTimes(state, action) {
  switch (action.type) {
    case 'UPDATE_TIMES': {
      if (!action.date) {
        return state;
      }

      const [year, month, day] = action.date.split('-').map(Number);
      const selectedDate = new Date(year, month - 1, day);

      return fetchAPI(selectedDate);
    }

    default:
      return state;
  }
}

export function submitBooking(formData) {
  const success = submitAPI(formData);

  if (success !== true) {
    return success;
  }

  const savedBookings = localStorage.getItem('bookings');

  const existingBookings = savedBookings
    ? JSON.parse(savedBookings)
    : [];

  const updatedBookings = [...existingBookings, formData];

  localStorage.setItem(
    'bookings',
    JSON.stringify(updatedBookings)
  );

  return true;
}

const Main = () => {

  const [availableTimes, dispatch] = useReducer(
    updateTimes,
    undefined,
    initializeTimes
  );

  const navigate = useNavigate();

const submitForm = (formData) => {
  const success = submitBooking(formData);

  if (success === true) {
    navigate('/booking-confirmed');
  }

  return success;
};

  return (
    <Routes>
      <Route path='/' element={<Home />} />

      <Route
        path='/booking'
        element={
          <BookingPage
            availableTimes={availableTimes}
            dispatch={dispatch}
            submitForm={submitForm}
          />
        }
      />

      <Route
        path='/booking-confirmed'
        element={<BookingConfirmed />}
      />
    </Routes>
  );
}


export default Main;
