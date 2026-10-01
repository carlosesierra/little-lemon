const testimonial = {
    title: 'Testimonials',
}

const testimonialItems = [
    {
    title:'Sara Lopez', 
    username:'Sara72', 
    copy:<>Seriously cannot stop thinking about the Turkish Mac n' Cheese!!</>,
    image:'./testimonial-1.png',
    rating:<>&#9733;&#9733;&#9733;&#9733;&#9733;</>
    },
    {
    title:'John Doucette', 
    username:'Johnny_Utah', 
    copy:<>We had such a great time celebrating my grandmothers birthday!</>,
    image:'./testimonial-2.png',
    rating:<>&#9733;&#9733;&#9733;&#9733;&#9733;</>
    },
    {
    title:'Jimmy Crickets', 
    username:'JimmyC', 
    copy:<>Such a chilled out atmosphere, love it!</>,
    image:'./testimonial-3.png',
    rating:<>&#9733;&#9733;&#9733;&#9733;&#9733;</>
    },
    {
    title:'Mia Maria', 
    username:'MiaM', 
    copy:<>Best Feta Salad in town. Flawless every time!</>,
    image:'./testimonial-4.png',
    rating:<>&#9733;&#9733;&#9733;&#9733;&#9733;</>
    }
]

const Testimonials = () => {
  return (
     <>
    <section aria-label='testimonials introduction' className='testimonials-intro'>
       <h2>{testimonial.title}</h2>
    </section>
    <section aria-label='testimonials items' className='testimonial-item'>
        {testimonialItems.map((testimonialItems, index) => (
            <article>
                <span className='testimonial-item-rating'>
                   {testimonialItems.rating}
                </span>
                <div className='testimonial-item-header'>
                    <figcaption aria-label='testimonial item image'>
                        <img src={testimonialItems.image} alt={testimonialItems.title}/>
                    </figcaption>
                    <span>
                    <h4>{testimonialItems.title}</h4>
                    <small>{testimonialItems.username}</small>
                    </span>
                </div>
                <p>{testimonialItems.copy}</p>
            </article>
        ))}
    </section>
    </>
  );
}

export default Testimonials;