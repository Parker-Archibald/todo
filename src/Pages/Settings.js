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

    const changeColorThemeSecondary = () => {
        const body = document.querySelector('body');

        body.style.setProperty('--secondary-theme-color', state.color)
    }

    const openThemeSection = () => {
        if(document.getElementById('themeSetting').className === 'themeSetting') {
            document.getElementById('themeSetting').className = 'themeSettingAfter';
        }
        else if(document.getElementById('themeSetting').className === 'themeSettingAfter') {
            document.getElementById('themeSetting').className = 'themeSetting';
        }
    }

    return(
        <div>
            <div id=''>
                <div id='changeColorButton'>Settings</div>
                <div id='themeSetting' className='themeSetting'>
                    <div id='themeSettingTitle' onClick={openThemeSection}>Themes</div>
                    <div id='themeSettingPrimary'>Primary: <input type='color' onChange={handleColorInput}/></div>
                    <div id='themeSettingSecondary'>Secondary: <input type='color' onChange={handleColorInput}/></div>
                    <div id='changeColorSubmit' onClick={changeColorThemeSecondary}>Submit</div>
                </div>
            </div>
        </div>
    )
}

export default Settings;