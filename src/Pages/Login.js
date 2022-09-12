import React, {useState} from 'react';
import '../Styles/Login.css';
import {Link} from 'react-router-dom';
import {AiOutlineEyeInvisible, AiOutlineEye} from 'react-icons/ai';
import {TODO_API} from '../COM/com';

const Login = () => {

    const [state, setState] = useState({
        hardEmail: 'test@test.com',
        hardPass: 'test',
        email: '',
        password: '',
        icon: <AiOutlineEye/>
    });

    const handleLoginReveal = () => {
        if(document.getElementById('loginPasswordInput').type === 'password') {
            document.getElementById('loginPasswordInput').type = 'text';
            setState(previousData => {
                return {...previousData, icon: <AiOutlineEyeInvisible/>}
            })
        }
        else {
            document.getElementById('loginPasswordInput').type = 'password';
            setState(previousData => {
                return {...previousData, icon: <AiOutlineEye/>}
            })
        }
    }

    const handleInputChange = (e) => {
        setState(previousData => {
            return {...previousData, [e.target.name]: e.target.value}
        })
    }

    const handleLogin = (e) => {

        fetch(`${TODO_API}getUser/${state.email}/${state.password}`)
        .then(results => results.json())
        .then(results => {
            localStorage.userID = results.id
            document.cookie = `userId=${results[0]._id}`

            localStorage.isLoggedIn = true;
            setTimeout("document.location.reload(true)", 200);
        })
        // .then(results => {
            // results.json();
            // console.log(results.json())
            // if(results.status === 401) {
            //     alert('Username or Password is incorrect')
            // }
            // else {
            //     console.log( results.id)
            //     localStorage.userID = results.id
            //     document.cookie = `userId=${results._id}`

            //     localStorage.isLoggedIn = true;
            //     setTimeout("document.location.reload(true)", 200);
            // }
        // })

    }

    return(
        <div id='loginContainer'>
            <div id='background1'/>
            <div id='background2'/>
            <h1 id='loginWelcome'>Welcome!</h1>
            <div id='loginText'>Sign in to your account</div>
            <form id='loginForm'>
                <input type='email' id='loginEmailInput' placeholder='Email' name='email' onChange={handleInputChange}/><br/>
                <input type='password' id='loginPasswordInput' placeholder='Password' name='password' onChange={handleInputChange}/>
                <div id='loginIcon' onClick={handleLoginReveal}>{state.icon}</div>
                <div id='loginRememberMe'><input type='checkbox' id='rememberMeCheckbox'/>Remember me</div>
                <div id='loginRegister'><Link to='/register' style={{'color': 'black', 'textDecoration': 'none'}}>Create Account</Link></div>
                <div id='loginButton' onClick={handleLogin}><Link to='/' style={{'color': 'black', 'textDecoration': 'none'}}>Login</Link></div>
            </form>
        </div>
    )
}

export default Login;