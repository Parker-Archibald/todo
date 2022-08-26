import React from 'react';
import { useLocation } from "react-router-dom"
import '../Styles/SingleTaskPage.css';
import ItemSingle from '../Components/ItemSingle';
import AddToDoModal from '../Components/AddToDoModal';


const SingleTaskPage = () => {

    const location = useLocation(); 
    const {from} = location.state;

    const taskInfo = location.state.info;

    const state = {
        task_name: taskInfo.task_name,
        date: taskInfo.date,
        time: taskInfo.time,
        notes: taskInfo.notes,
        isCompleted: taskInfo.isCompleted,
        items: taskInfo.items
    }

    const dateObj = new Date(state.date);
    const month = dateObj.toLocaleString('default', { month: 'long' });
    const newdate = month + ' ' + dateObj.getDate();

    const handleOpenModal = () => {
        document.getElementById('singleTaskPageTaskItemModal').className = 'singleTaskPageTaskItemModalAfter';
        document.getElementById('singleTaskPageContainer').style = 'filter: blur(4px)';
    }

    return(
        <div>
            <div id='singleTaskPageContainer'>
            <div id='singleTaskPageTop'>
                <div id='singleTaskPageTaskName'>{state.task_name}</div>
                <div id='singleTaskPageTaskDate'>{newdate}</div>
                <div id='singleTaskPageAddTask' onClick={handleOpenModal}>Add To Do</div>'
            </div>
            <div id='singleTaskPageTaskItem'><ItemSingle info={state}/></div>
            
        </div>
            <div><AddToDoModal info={state}/></div>
        </div>
    )
}

export default SingleTaskPage;