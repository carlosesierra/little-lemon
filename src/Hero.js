import { Link } from 'react-router-dom';

const hero = {
    title: 'Little Lemon',
    subtitle: 'Chicago',
    description: 'We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.',
    image: './restauranfood.jpg',
    alt: 'A platter of Mediterranean appetizers'
}

const Hero = () => {
  return (
    <>
    <header className='bg-green'>
      <section className='grid-container max-w-1200'>
        <article aria-label='hero copy'>
            <h1>{hero.title}</h1>
            <p className='color-salmon subtitle'>{hero.subtitle}</p>
            <p>{hero.description}</p>
            <Link to='/booking' className='button'>
              Reserve a Table
            </Link>
        </article>
        <img
          src={hero.image}
          alt={hero.alt}
        />
        </section>
    </header>
    </>
  );
}

export default Hero;