import React, {useState} from 'react';
import '../Styles/Settings.css';


const Settings = () => {

    const [state, setState] = useState({
        color: ''
    })

    const handleColorInput = (e) => {
        setState(previousState => {
            return {...previousState, color: e.target.value}
        })
    }

    const changeColorTheme = () => {
        const body = document.querySelector('body');

        body.style.setProperty('--theme-color', state.color)
    }

    return(
        <div>
            <div id='changeColorButton'>
                <input onChange={handleColorInput}/>
                <div id='changeColorSubmit' onClick={changeColorTheme}>Submit</div>
            </div>
        </div>
    )
}

export default Settings;