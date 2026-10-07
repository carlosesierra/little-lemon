const Bookings = ({
  availableTimes,
  selectedDate = '',
  }) => {
  return (
    <section
      aria-labelledby='available-bookings-heading'
      className='grid-container booking pt-0'
    >
      <article>
        <h2 id='available-bookings-heading' className='mt-0'>
          Available booking times
        </h2>

        {!selectedDate ? (
          <p>Choose a date to see its available times.</p>
        ) : (
          <>
            <p>Available times for {selectedDate}</p>

            {availableTimes.length === 0 ? (
              <p>No times are available. Choose another date.</p>
            ) : (
              <ul className='times'>
                {availableTimes.map((time) => (
                  <li key={time}>{time}</li>
                ))}
              </ul>
            )}
          </>
        )}
      </article>
    </section>
  );
};

export default Bookings;