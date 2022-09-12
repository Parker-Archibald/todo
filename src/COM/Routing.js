import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Tasks from '../Pages/Tasks';
import Schedule from '../Pages/Schedule';
import Settings from '../Pages/Settings';
import SingleTaskPage from '../Pages/SingleTaskPage';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import PageNotFound from '../Pages/PageNotFound';

const Routing = (props) => {

    if(localStorage.isLoggedIn === 'true') {
        return(
            <Routes>
                <Route path='/' element={<Tasks/>}/>
                <Route path='/schedule' element={<Schedule/>}/>
                <Route path='/settings' element={<Settings/>}/>
                <Route path='/single_task_page' element={<SingleTaskPage />}/>
            </Routes>
        )
    }
    else {
        return(
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='*' element={<PageNotFound/>}/>
            </Routes>
        )
    }
}

export default Routing;