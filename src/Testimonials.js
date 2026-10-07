import React from 'react';

const testimonial = {
    title: 'Testimonials',
};

const testimonialItems = [
    {
        title: 'Sara Lopez', 
        username: 'Sara72', 
        copy: <>Seriously cannot stop thinking about the Turkish Mac n' Cheese!!</>,
        image: './testimonial-1.png',
        rating: 5
    },
    {
        title: 'John Doucette', 
        username: 'Johnny_Utah', 
        copy: <>We had such a great time celebrating my grandmothers birthday!</>,
        image: './testimonial-2.png',
        rating: 4
    },
    {
        title: 'Jimmy Crickets', 
        username: 'JimmyC', 
        copy: <>Such a chilled out atmosphere, love it!</>,
        image: './testimonial-3.png',
        rating: 3
    },
    {
        title: 'Mia Maria', 
        username: 'MiaM', 
        copy: <>Best Feta Salad in town. Flawless every time!</>,
        image: './testimonial-4.png',
        rating: 5
    }
];

// Helper function to generate stars and screen reader text
const getStarRating = (rating = 0) => {
    const count = Math.max(0, Math.min(5, Number(rating) || 0));
    const stars = '★'.repeat(count) + '☆'.repeat(5 - count);
    const srText = count === 0 ? 'No stars' : `${count} out of 5 stars`;

    return (
        <span className='rating'>
            <span aria-hidden='true'>{stars}</span>
            <span className='sr-only'>{srText}</span>
        </span>
    );
};

const Testimonials = () => {
  return (
    <>
      <section aria-label='testimonials introduction' className='testimonials-intro'>
         <h2>{testimonial.title}</h2>
      </section>
      <section aria-label='testimonials items' className='grid-container testimonial-item'>
          {testimonialItems.map((item, index) => (
              <article key={index}>
                  {getStarRating(item.rating)}
                  <div className='grid-container user'>
                      <img src={item.image} alt={item.title}/>
                      <div>
                          <h4>{item.title}</h4>
                          <small>{item.username}</small>
                      </div>
                  </div>
                  <p>{item.copy}</p>
              </article>
          ))}
      </section>
    </>
  );
};

export default Testimonials;
