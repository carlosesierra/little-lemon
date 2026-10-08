import { useEffect, useRef, useState } from 'react';
import { loadBookingDraft } from './BookingDraft';

const ignoreDateChange = () => {};

const BookingForm = ({
    availableTimes,
    dispatch,
    submitForm,
    onDateChange = ignoreDateChange,
  }) => {

  const [draft] = useState(loadBookingDraft);

  const [name, setName] = useState(draft.name);
  const [email, setEmail] = useState(draft.email);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [date, setDate] = useState(draft.date);
  const [time, setTime] = useState(draft.time);
  const [guests, setGuests] = useState(draft.guests);
  const [occasion, setOccasion] = useState(draft.occasion);

  const emailRef = useRef(null);
  const [draftWarning, setDraftWarning] = useState('');

  const [touched, setTouched] = useState({});
  const [submissionError, setSubmissionError] = useState('');

  const today = new Date();
  const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0'),
  ].join('-');

  const errors = {
    name:
      name.trim().length < 2
        ? 'Enter a name with at least two characters.'
        : '',

    email:
      !isEmailValid
        ? 'Enter a valid email address.'
        : '',

    date:
      !date || date < todayString
        ? 'Choose today or a future date.'
        : '',

    time:
      !availableTimes.includes(time)
        ? 'Choose an available reservation time.'
        : '',

    guests:
      !Number.isInteger(guests) || guests < 1 || guests > 10
        ? 'Choose a whole number between 1 and 10 guests.'
        : '',

    occasion:
      !['Birthday', 'Anniversary', 'Engagement'].includes(occasion)
        ? 'Choose an occasion.'
        : '',
  };

  const isFormValid = Object.values(errors).every(
    (message) => message === ''
  );

  const errorProps = (field) => {

    const showError = Boolean(touched[field] && errors[field]);
    return {
      onBlur: () => {
        setTouched((previous) => ({
          ...previous,
          [field]: true,
        }));
      },
      'aria-invalid': showError,
      'aria-describedby': showError
        ? `${field}-error`
        : undefined,
    };
  };

  const renderError = (field) => {
    if (!touched[field] || !errors[field]) {
      return null;
    }

    return (
      <p id={`${field}-error`} className='field-error'>
        {errors[field]}
      </p>
    );
  };

  const handleDateChange = (e) => {
  const selectedDate = e.target.value;

    setDate(selectedDate);
    onDateChange(selectedDate);

    setTime('');
    dispatch({
      type: 'UPDATE_TIMES',
      date: selectedDate,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTouched({
      name: true,
      email: true,
      date: true,
      time: true,
      guests: true,
      occasion: true,
    });

    if (!isFormValid || !e.currentTarget.reportValidity()) {
      return;
    }

    setSubmissionError('');

    const formData = {
      name: name.trim(),
      email: email.trim(),
      date,
      time,
      guests,
      occasion,
    };

    const result = submitForm(formData);

    if (result?.success === false) {
      setSubmissionError(result.message);
    }
  };

  // Validate an email restored from a draft.
  useEffect(() => {
    setIsEmailValid(emailRef.current?.validity.valid ?? false);
  }, [email]);

  // Restore availability and the date shown by Bookings.
  useEffect(() => {
    if (draft.date) {
      dispatch({
        type: 'UPDATE_TIMES',
        date: draft.date,
      });

      onDateChange(draft.date);
    }
  }, [draft.date, dispatch, onDateChange]);

  // Save changes, or remove an empty draft.
  useEffect(() => {
    const draftData = {
      name,
      email,
      date,
      time,
      guests,
      occasion,
    };

    const hasDraft =
      name !== '' ||
      email !== '' ||
      date !== '' ||
      time !== '' ||
      guests !== 1 ||
      occasion !== 'Birthday';

    try {
      if (hasDraft) {
        sessionStorage.setItem(
          'bookingDraft',
          JSON.stringify(draftData)
        );
      } else {
        sessionStorage.removeItem('bookingDraft');
      }

      setDraftWarning('');
    } catch {
      setDraftWarning(
        'Your draft could not be saved. Keep this page open ' +
        'until you finish your reservation.'
      );
    }
  }, [name, email, date, time, guests, occasion]);

  const discardDraft = () => {
    setName('');
    setEmail('');
    setIsEmailValid(false);
    setDate('');
    setTime('');
    setGuests(1);
    setOccasion('Birthday');
    setTouched({});
    setSubmissionError('');

    onDateChange('');

    dispatch({
      type: 'UPDATE_TIMES',
      date: '',
    });
  };

  return (
    <section aria-labelledby='booking-form-heading' className='grid-container booking'>
      <article aria-label='booking copy'>
        <h2 id='booking-form-heading' className='sr-only'>
          Reserve a Table
        </h2>
        <p>Book your table online and enjoy a delicious meal at Little Lemon.</p>
        <small>
          Complete all fields. Use a name with at least two characters, a valid email, today's date or later, an available time and between 1 and 10 guests.
        </small>
      </article>

      <form
        className='booking-form'
        onSubmit={handleSubmit}
        aria-labelledby='booking-form-heading'
      >
        <label htmlFor='name'>Name</label>
        <input
          id='name'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          minLength={2}
          required
        />

        <label htmlFor='email'>Email</label>
        <input
          ref={emailRef}
          id='email'
          type='email'
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setIsEmailValid(e.target.validity.valid);
          }}
          required
          {...errorProps('email')}
        />

        {renderError('email')}

        <label htmlFor='res-date'>Choose Date</label>
        <input 
          id='res-date'
          type='date'
          value={date}
          onChange={handleDateChange}
          min={todayString}
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
          min={1}
          max={10}
          step={1}
          value={guests}
          onChange={(e) => 
            setGuests(e.target.value === '' ? '' : Number(e.target.value))
          }
          required 
        />

        <label htmlFor='occasion'>Occasion</label>
        <select 
          id='occasion'
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)}
          required
        >
          <option value='Birthday'>Birthday</option>
          <option value='Anniversary'>Anniversary</option>
          <option value='Engagement'>Engagement</option>
        </select>
        {submissionError && (
          <p role='alert' className='field-error'>
            {submissionError}
          </p>
        )}
        {draftWarning && <p role='status'>{draftWarning}</p>}
        <input
          type='submit'
          value={
            submissionError
              ? 'Try reservation again'
              : 'Make Your Reservation'
          }
          className='button'
          disabled={!isFormValid}
        />

        <button type='button' onClick={discardDraft}>
          Discard draft
        </button>
      </form>
    </section>
  );
};

export default BookingForm;
