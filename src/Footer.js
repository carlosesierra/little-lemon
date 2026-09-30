const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
     <>
    <footer>      
        <p>&copy; {currentYear} Little Lemon. All rights reserved.</p>
    </footer>
    </>
  );
}

export default Footer;