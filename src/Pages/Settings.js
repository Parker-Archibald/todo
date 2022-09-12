import React, {useState, useEffect} from 'react';
import '../Styles/Settings.css';
import {TODO_API} from '../COM/com';
import {Link} from 'react-router-dom';


const Settings = () => {

    const [state, setState] = useState({
        primaryColor: '',
        secondaryColor: '',
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
        changeColorTheme()
    }) 

    const handleColorInput = (e) => {     

            setState(previousState => {
                return {...previousState, [e.target.className]: e.target.value}
            })
    }

    const changeColorTheme = () => {
        const body = document.querySelector('body');

        body.style.setProperty('--theme-color', state.primaryFinal);
        body.style.setProperty('--secondary-theme-color', state.secondaryFinal);
    }


    const openThemeSection = () => {
        if(document.getElementById('themeSetting').className === 'themeSetting') {
            document.getElementById('themeSetting').className = 'themeSettingAfter';
        }
        else if(document.getElementById('themeSetting').className === 'themeSettingAfter') {
            document.getElementById('themeSetting').className = 'themeSetting';
        }
    }

    async function handleSubmitTheme() {
        await fetch(`${TODO_API}setTheme/${state.primaryColor}/${state.secondaryColor}`, {
            method: "Put",
            headers: {
                "Content-Type": 'application/json'
            }
        })
        .then(alert('Theme changed!'))
    }

    const handleLogout = () => {
        localStorage.userID = '';
        localStorage.isLoggedIn = false;
    }

    return(
        <div>
            <div id=''>
                <div id='changeColorButton'>Settings</div>
                <div id='themeSetting' className='themeSetting'>
                    <div id='themeSettingTitle' onClick={openThemeSection}>Themes</div>
                    <div id='themeSettingPrimary'>Primary Color: <input onChange={handleColorInput} className = 'primaryColor'/> </div>
                    <div id='themeSettingSecondary'>SecondaryColor:<input className = 'secondaryColor' onChange={handleColorInput}/> </div>
                    <div id='changeColorSubmit' onClick={handleSubmitTheme}>Submit</div>
                </div>
            </div>
            <div id='logoutButton' onClick={handleLogout}><Link to='/' style={{'color': 'black', 'textDecoration': 'none'}}>Logout</Link></div>
        </div>
    )
}

export default Settings;