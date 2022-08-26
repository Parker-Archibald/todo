import React from 'react';
import '../Styles/Nav.css';
import {BsListCheck} from 'react-icons/bs';
import {AiOutlineSchedule} from 'react-icons/ai';
import {FiSettings} from 'react-icons/fi';
import {Link} from 'react-router-dom';

const Nav = () => {
    return(
        <div id='navContainer'>
            <div id='navIcons'>
                <div id='navTodoIcon'><Link to='/' style={{textDecoration: 'none', color: 'black'}}><BsListCheck/></Link></div>
                <div id='navScheduleIcon'><Link to='/schedule' style={{textDecoration: 'none', color: 'black'}}><AiOutlineSchedule/></Link></div>
                <div id='navSettingsIcon'><Link to='/settings' style={{textDecoration: 'none', color: 'black'}}><FiSettings/></Link></div>
            </div>
        </div>
    )
}

export default Nav;