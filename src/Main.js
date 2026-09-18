
import logo from './logo.svg';

const Main = () => {
  return (
    <div className='App'>
      <header>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          little lemon <code>[some code]</code> coming soon.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          I will learn React
        </a>
      </header>
    </div>
  );
}

export default Main;
