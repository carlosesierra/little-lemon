const footerImage = {
  image:'./icon.svg',
  alt:'Little Lemon restaurant'
}


const footerList = [
    {
    title:'Doormat Navigation',
    listItem:['home', 'about', 'menu', 'reservations', 'order online', 'login'],
    },
     {
    title:'Contact',
    listItem:['Address', 'Phone number', 'Email'],
    },
     {
    title:'Social Media Links',
    listItem:['Facebook', 'Instagram', 'Twitter'],
    }
]

const Footer = () => {
  return (
     <>
    <footer>
      <section aria-label='footer items' className='footer-section'>
        <figcaption aria-label='footer item image'>
          <img src={footerImage.image} alt={footerImage.alt} />
        </figcaption>
        {footerList.map((footerItem, index) => (
            <article key={index}>
               <h3>{footerItem.title}</h3>
               <ul>
                {footerItem.listItem.map((item) => (
                  <li key={item}>{item}</li>
                ))}
               </ul>
            </article>
        ))}

      </section>
    </footer>
    </>
  );
}

export default Footer;