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
    copy:'The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.',
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
    <section aria-label='specials introduction' className='specials-intro'>
       <h2>{special.title}</h2>
      <span>
        <button>Reserve a Table</button>
      </span>
    </section>
    <section aria-label='specials items' className='special-item'>
        {specialItems.map((specialItems, index) => (
            <article key={index}>
                <figcaption aria-label='special item image'>
                    <img src={specialItems.image} alt={specialItems.title}/>
                </figcaption>
                <div className='special-item-header'>
                    <h3>{specialItems.title}</h3>
                    <h4 className='color-salmon'>{specialItems.price}</h4>
                </div>
                <p>{specialItems.copy}</p>
                <a href='#logo' className='special-item-delivery'>
                    <h6>Order a delivery</h6>
                    <img src='./delivery.svg' alt='delivery'/>
                </a>
            </article>
        ))}
    </section>
    </>
  );
}

export default Specials;