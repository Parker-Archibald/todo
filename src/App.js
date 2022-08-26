import Routing from "./COM/Routing";
import {BrowserRouter as Router} from 'react-router-dom';
import Nav from "./COM/Nav";
import './Styles/App.css';

function App() {
  return (
    <div className="App">
        <Router>
          <Nav/>
          <Routing/>
        </Router>
    </div>
  );
}

export default App;
