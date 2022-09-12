import React, {useState} from 'react';
import '../Styles/Register.css';
import {Link} from 'react-router-dom';
import { TODO_API } from '../COM/com';

const Register = () => { 
    
    const [state, setState] = useState();

    const handleChange = (e) => {
        setState(previousData => {
            return {...previousData, [e.target.name]: e.target.value}
        })
    }

    const createAccount = () => {
        if(state.password !== state.confirm) {
            alert('Passwords do not match')
        }
        else {
            fetch(`${TODO_API}newUser`, {
                method: "Post",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(state)
            })
            .then(alert('userCreated'))
        }
    }

    return( 
        <div id='registerContainer'>
            <div id='background1New'/>
            <div id='background2New'/>
            <h3 id='registerTitle'>Create an account</h3>
            <div id='registerText'>Start Tasking</div>
            <form id='registerForm'>
                <input type='name' id='registerFirstName' placeholder='First name' name='first_name'/>
                <input type='name' id='registerLastName' placeholder='Last name' name='last_name'/>
                <input type='email' id='registerEmail' placeholder='Email' name='email' onChange={handleChange} required/>
                <input type='password' id='registerPassword' placeholder='Password' name='password' onChange={handleChange} required/>
                <input type='password' id='registerConfirm' placeholder='Confirm Password' name='confirm' onChange={handleChange} required/>
                <div id='alreadyRegistered'>Already have an account?<Link to='/' style={{'color': 'black'}}>Login</Link></div>
                <div id='registerButton' onClick={createAccount}>Create Account</div>
            </form>
        </div>
    )
}

export default Register;