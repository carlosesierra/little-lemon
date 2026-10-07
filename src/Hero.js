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
    <header className='grid-container bg-green'>
        <article aria-label='hero copy'>
            <h1>{hero.title}</h1>
            <h3>{hero.subtitle}</h3>
            <p>{hero.description}</p>
            <button>Reserve a Table</button>
        </article>
        <img
          src={hero.image}
          alt={hero.alt}
        />
    </header>
    </>
  );
}

export default Hero;