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
  let existingBookings;

  // Read existing records before submitting to the API.
  try {
    const saved = localStorage.getItem('bookings');

    existingBookings = saved ? JSON.parse(saved) : [];

    if (!Array.isArray(existingBookings)) {
      throw new Error('Invalid bookings data');
    }
  } catch {
    throw new Error(
      'Your saved reservations could not be read. ' +
      'No new reservation was submitted. Please contact us for help.'
    );
  }

  let success;

  try {
    success = submitAPI(formData);
  } catch {
    throw new Error(
      'We could not verify the submission. ' +
      'Please check whether it was received before submitting again.'
    );
  }

  if (success !== true) {
    return false;
  }

  try {
    localStorage.setItem(
      'bookings',
      JSON.stringify([...existingBookings, formData])
    );
  } catch {
    const error = new Error(
      'Your reservation was confirmed, but it could not be ' +
      'saved on this device. Keep the confirmation details.'
    );

    error.bookingConfirmed = true;
    throw error;
  }

  return true;
}

const Main = () => {

  const [availableTimes, dispatch] = useReducer(
    updateTimes,
    undefined,
    initializeTimes
  );

  const navigate = useNavigate();

  const showConfirmation = (formData, warning = '') => {
    try {
      sessionStorage.removeItem('bookingDraft');
    } catch {
      warning = [
        warning,
        'The saved draft could not be cleared on this device.',
      ].filter(Boolean).join(' ');
    }

    navigate('/booking-confirmed', {
      state: {
        confirmed: true,
        booking: formData,
        warning,
      },
    });

    return { success: true };
  };

  const submitForm = (formData) => {
    try {
      const success = submitBooking(formData);

      if (success !== true) {
        return {
          success: false,
          message:
            'Your reservation was not accepted. Please try again.',
        };
      }

      return showConfirmation(formData);
    } catch (error) {
      if (error.bookingConfirmed) {
        return showConfirmation(formData, error.message);
      }

      return {
        success: false,
        message:
          error.message || 'Unable to submit your reservation.',
      };
    }
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
