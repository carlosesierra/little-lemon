export const EMPTY_DRAFT = {
  name: '',
  email: '',
  date: '',
  time: '',
  guests: 1,
  occasion: 'Birthday',
};

export function loadBookingDraft() {
  try {
    const saved = sessionStorage.getItem('bookingDraft');
    const data = saved ? JSON.parse(saved) : null;

    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      return { ...EMPTY_DRAFT };
    }

    return {
      name: typeof data.name === 'string' ? data.name : '',
      email: typeof data.email === 'string' ? data.email : '',
      date: typeof data.date === 'string' ? data.date : '',
      time: typeof data.time === 'string' ? data.time : '',
      guests:
        data.guests === '' || typeof data.guests === 'number'
          ? data.guests
          : 1,
      occasion:
        ['Birthday', 'Anniversary', 'Engagement'].includes(data.occasion)
          ? data.occasion
          : 'Birthday',
    };
  } catch {
    return { ...EMPTY_DRAFT };
  }
}