import logo from './logo.svg';
import './App.css';
import Status from './status/Status';

const address = "vh-beta.ericjiang.me";
const password = "yeah1234";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Address: {address}
          <button onClick={() => navigator.clipboard.writeText(address)}>Copy</button>
          <br/>
          Password: {password}
          <button onClick={() => navigator.clipboard.writeText(password)}>Copy</button>
        </p>
        <Status />
      </header>
    </div>
  );
}

export default App;
