import Routing from "./COM/Routing";
import {BrowserRouter as Router} from 'react-router-dom';
import Nav from "./COM/Nav";
import './Styles/App.css';
import {useEffect, useState} from 'react';
import {TODO_API} from './COM/com';

function App() {

  const [state, setState] = useState({
    primaryFinal: '',
    secondaryFinal: ''
})

  useEffect(() => {
    fetch(`${TODO_API}getTheme`)
        .then(results => {return results.json()})
        .then(results => {
            const primary = results[0].themeColors.primary
            const secondary = results[0].themeColors.secondary
            setState(previousState => {
                return {...previousState, primaryFinal: primary, secondaryFinal: secondary}
            })
        })
        const body = document.querySelector('body');

        body.style.setProperty('--theme-color', state.primaryFinal);
        body.style.setProperty('--secondary-theme-color', state.secondaryFinal);
  })

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
