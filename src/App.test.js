import { render, screen, fireEvent } from '@testing-library/react';
import Bookings from './Bookings';
import BookingForm from './BookingForm';
import { initializeTimes, updateTimes, submitBooking, } from './Main';

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();

  global.fetchAPI = jest.fn();
  global.submitAPI = jest.fn().mockReturnValue(true);
});

afterEach(() => {
  localStorage.clear();
  sessionStorage.clear();

  delete global.fetchAPI;
  delete global.submitAPI;
});

jest.mock('react-router-dom', () => ({
  BrowserRouter: () => null,
  Routes: () => null,
  Route: () => null,
}));


// Keep your three existing tests below.

test('renders the BookingForm heading', () => {
  render(
    <BookingForm
      availableTimes={['17:00', '18:00']}
      dispatch={jest.fn()}
      submitForm={jest.fn()}
    />
  );

  const heading = screen.getByRole('heading', {
    name: 'Reserve a Table',
    level: 2,
  });

  expect(heading).toBeInTheDocument();
});

test('initializeTimes returns availability from the API', () => {
  const expectedTimes = ['17:30', '20:00'];
  global.fetchAPI.mockReturnValue(expectedTimes);

  expect(initializeTimes()).toEqual(expectedTimes);
  expect(global.fetchAPI).toHaveBeenCalledWith(expect.any(Date));
});

test('updateTimes requests availability for the selected date', () => {
  const expectedTimes = ['18:30', '21:00'];
  global.fetchAPI.mockReturnValue(expectedTimes);

  const result = updateTimes(['17:00'], {
    type: 'UPDATE_TIMES',
    date: '2026-10-10',
  });

  expect(result).toEqual(expectedTimes);
  expect(global.fetchAPI).toHaveBeenCalledWith(
    new Date(2026, 9, 10)
  );
});

test('renders the Bookings heading', () => {
  render(<Bookings availableTimes={['17:00', '18:00']} />);

  const heading = screen.getByRole('heading', {
    name: 'Available booking times',
    level: 2,
  });

  expect(heading).toBeInTheDocument();
});

test('allows the user to submit the booking form', () => {
  const mockSubmitForm = jest.fn();

  render(
    <BookingForm
      availableTimes={['17:00', '18:00']}
      dispatch={jest.fn()}
      submitForm={mockSubmitForm}
    />
  );

  fireEvent.change(screen.getByLabelText('Name'), {
    target: { value: 'Test Guest' },
  });

  fireEvent.change(screen.getByLabelText('Email'), {
    target: { value: 'test@example.com' },
  });

  fireEvent.change(screen.getByLabelText('Choose Date'), {
    target: { value: '2026-10-10' },
  });

  fireEvent.change(screen.getByLabelText('Choose Time'), {
    target: { value: '18:00' },
  });

  fireEvent.change(screen.getByLabelText('Number of Guests'), {
    target: { value: '2' },
  });

  fireEvent.change(screen.getByLabelText('Occasion'), {
    target: { value: 'Anniversary' },
  });

  fireEvent.click(
    screen.getByRole('button', {
      name: 'Make Your Reservation',
    })
  );

  expect(mockSubmitForm).toHaveBeenCalledTimes(1);

  expect(mockSubmitForm).toHaveBeenCalledWith({
    name: 'Test Guest',
    email: 'test@example.com',
    date: '2026-10-10',
    time: '18:00',
    guests: 2,
    occasion: 'Anniversary',
  });
});

test('saves a successful booking to local storage', () => {
  const booking = {
    name: 'Jane Doe',
    email: 'jane@example.com',
    date: '2026-10-11',
    time: '17:00',
    guests: 2,
    occasion: 'Anniversary',
  };

  const success = submitBooking(booking);

  const savedBookings = JSON.parse(
    localStorage.getItem('bookings')
  );

  expect(success).toBe(true);
  expect(global.submitAPI).toHaveBeenCalledWith(booking);
  expect(savedBookings).toEqual([booking]);
});

test('reads existing bookings and preserves them when adding another', () => {
  const existingBooking = {
    name: 'Jane Doe',
    email: 'jane@example.com',
    date: '2026-10-11',
    time: '17:00',
    guests: 2,
    occasion: 'Anniversary',
  };

  const newBooking = {
    name: 'John Smith',
    email: 'john@example.com',
    date: '2026-10-12',
    time: '18:00',
    guests: 4,
    occasion: 'Birthday',
  };

  // Arrange: simulate a booking already saved.
  localStorage.setItem(
    'bookings',
    JSON.stringify([existingBooking])
  );

  // Act: submit another booking.
  submitBooking(newBooking);

  // Assert: the original booking remains.
  const savedBookings = JSON.parse(
    localStorage.getItem('bookings')
  );

  expect(savedBookings).toEqual([
    existingBooking,
    newBooking,
  ]);
});