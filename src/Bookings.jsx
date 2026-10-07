const Bookings = ({ availableTimes }) => {
  return (
    <section aria-label='Available booking times' className='grid-container booking'>
      <article aria-label='booking times'>
        <h2 id='available-bookings-heading'>
          Available booking times
        </h2>
        {availableTimes.length === 0 ? (
        <p>No booking times are available.</p>
      ) : (
        <ul className='times' aria-labelledby='available-bookings-heading'>
          {availableTimes.map((time) => (
            <li key={time}>{time}</li>
          ))}
        </ul>
      )}
      </article>
    </section>
  );
};

export default Bookings;