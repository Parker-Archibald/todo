import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Tasks from '../Pages/Tasks';
import Schedule from '../Pages/Schedule';
import Settings from '../Pages/Settings';
import SingleTaskPage from '../Pages/SingleTaskPage';

const Routing = (props) => {
    return(
        <Routes>
            <Route path='/' element={<Tasks/>}/>
            <Route path='/schedule' element={<Schedule/>}/>
            <Route path='/settings' element={<Settings/>}/>
            <Route path='/single_task_page' element={<SingleTaskPage />}/>
        </Routes>
    )
}

export default Routing;