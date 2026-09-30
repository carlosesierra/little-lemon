import logo from './logo.svg';

const Nav = () => {
  return (
    <>
    <nav>
        <img src={logo} alt='logo' />
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#menu">Menu</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
    </nav>      
    </>
  );
}

export default Nav;
