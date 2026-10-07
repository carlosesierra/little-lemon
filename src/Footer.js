const footerImage = {
  image:'./icon.svg',
  alt:'Little Lemon restaurant'
}


const footerList = [
    {
    title:'Menu',
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
    <footer className='bg-green'>
      <section aria-label='footer items' className='grid-container'>
        <img src={footerImage.image} alt={footerImage.alt}/>
        {footerList.map((footerItem, index) => (
            <article key={index} className='color-light'>
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