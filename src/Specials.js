import { Link } from 'react-router-dom';

const special = {
    title: 'This Weeks Specials!',
}

const specialItems = [
    {
    title:'Greek salad', 
    price:'$12.99', 
    copy:'The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.',
    image:'./greek-salad.jpg'
    },
    {
    title:'Bruschetta', 
    price:'$5.99', 
    copy:'Toasted bread topped with tomatoes, fresh basil and olive oil.',
    image:'./bruchetta.png'
    },
    {
    title:'Lemon Dessert', 
    price:'$4.99', 
    copy:<>This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined.</>,
    image:'./lemon-dessert.jpg'
    }
]

const Specials = () => {
  return (
    <>
      <section aria-label='specials introduction' className='grid-container specials-intro max-w-1200'>
        <article>
          <h2>{special.title}</h2>
          <Link to='/booking' className='button'>
            Reserve a Table
          </Link>
        </article>
      </section>

      <section aria-label='specials items' className='grid-container specials-item max-w-1200'>
        {specialItems.map((specialItems, index) => (
          <article key={index}>
            <img src={specialItems.image} alt={specialItems.title} />
            <div className='specials-item-header'>
              <h3>{specialItems.title}</h3>
              <p className='color-salmon'>{specialItems.price}</p>
            </div>
            <p>{specialItems.copy}</p>
            <p className='color-dark'>
              Online ordering coming soon.
            </p>
          </article>
        ))}
      </section>
    </>
  );
}

export default Specials;