
import logo from './logo.svg';

const Main = () => {
  return (
     <>
    <main>      
        <h1>Little Lemon</h1>
        <br/>
      <img src={logo} className='logo' alt='logo' />
      <p>
        little lemon <code>[some code]</code> coming soon.
      </p>
        <a
        href='https://reactjs.org'
        target='_blank'
        rel='noopener noreferrer'
        >
        I will learn React
        </a>
    </main>
    </>
  );
}

export default Main;
