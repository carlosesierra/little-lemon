import { render, screen, fireEvent } from '@testing-library/react';
import BookingForm from './BookingForm';

beforeEach(() => {
  sessionStorage.clear();
});

afterEach(() => {
  sessionStorage.clear();
});


function dateString(offset = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offset);

  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-');
}

function renderForm() {
  const submitForm = jest.fn();

  const result = render(
    <BookingForm
      availableTimes={['17:00', '18:00']}
      dispatch={jest.fn()}
      submitForm={submitForm}
    />
  );

  return { ...result, submitForm };
}

function fillForm(overrides = {}) {
  const values = {
    Name: 'Test Guest',
    Email: 'test@example.com',
    'Choose Date': dateString(1),
    'Choose Time': '18:00',
    'Number of Guests': '2',
    Occasion: 'Anniversary',
    ...overrides,
  };

  Object.entries(values).forEach(([label, value]) => {
    fireEvent.change(screen.getByLabelText(label), {
      target: { value },
    });
  });
}

function submitButton() {
  return screen.getByRole('button', {
    name: 'Make Your Reservation',
  });
}

test.each([
  ['Name', { type: 'text', minlength: '2', required: '' }],
  ['Email', { type: 'email', required: '' }],
  ['Choose Date', { type: 'date', required: '' }],
  ['Choose Time', { required: '' }],
  [
    'Number of Guests',
    {
      type: 'number',
      min: '1',
      max: '10',
      step: '1',
      required: '',
    },
  ],
  ['Occasion', { required: '' }],
])('%s has the expected HTML validation attributes', (label, attributes) => {
  renderForm();

  const field = screen.getByLabelText(label);

  Object.entries(attributes).forEach(([attribute, value]) => {
    expect(field).toHaveAttribute(attribute, value);
  });

  if (label === 'Choose Date') {
    expect(field).toHaveAttribute('min', dateString());
  }
});

test('enables submission when all fields are valid', () => {
  const { submitForm } = renderForm();

  fillForm();

  expect(submitButton()).toBeEnabled();

  fireEvent.click(submitButton());

  expect(submitForm).toHaveBeenCalledTimes(1);
  expect(submitForm).toHaveBeenCalledWith({
    name: 'Test Guest',
    email: 'test@example.com',
    date: dateString(1),
    time: '18:00',
    guests: 2,
    occasion: 'Anniversary',
  });
});

test.each([
  ['empty name', { Name: '' }],
  ['short name', { Name: 'J' }],
  ['spaces-only name', { Name: '   ' }],
  ['empty email', { Email: '' }],
  ['invalid email', { Email: 'not-an-email' }],
  ['empty date', { 'Choose Date': '' }],
  ['past date', { 'Choose Date': dateString(-1) }],
  ['missing time', { 'Choose Time': '' }],
  ['empty guest count', { 'Number of Guests': '' }],
  ['too few guests', { 'Number of Guests': '0' }],
  ['too many guests', { 'Number of Guests': '11' }],
  ['fractional guests', { 'Number of Guests': '2.5' }],
  ['missing occasion', { Occasion: '' }],
])('rejects %s', (description, overrides) => {
  const { submitForm } = renderForm();

  fillForm(overrides);

  expect(submitButton()).toBeDisabled();

  // Directly trigger submission to exercise the handler's guard.
  fireEvent.submit(submitButton().closest('form'));

  expect(submitForm).not.toHaveBeenCalled();
});

test('disables submission when the selected time becomes unavailable', () => {
  const { rerender, submitForm } = renderForm();

  fillForm();
  expect(submitButton()).toBeEnabled();

  rerender(
    <BookingForm
      availableTimes={['17:00']}
      dispatch={jest.fn()}
      submitForm={submitForm}
    />
  );

  expect(submitButton()).toBeDisabled();
});