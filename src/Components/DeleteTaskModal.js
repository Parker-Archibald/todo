import React, {useState} from 'react';
import '../Styles/DeleteTaskModal.css';
import {useLocation, useNavigate} from 'react-router-dom';
import { TODO_API } from '../COM/com';

const DeleteTaskModal = () => {

    const location = useLocation(); 
    const navigate = useNavigate();
    const [taskName, setTaskName] = useState({
        task_name: location.state.info.task_name
    });

    const handleCloseDeleteTask = () => {
        document.getElementById('deleteTaskModalContainer').className = 'deleteTaskModalContainerAfterClose';
        document.getElementById('singleTaskPageContainer').style = 'filter: blur(0px)';
    }

    const confirmDelete = () => {
        fetch(`${TODO_API}deleteTask/${taskName.task_name}`, {
            method: 'Delete', 
        })
        .then(alert('Task Deleted'))
        .then(navigate('/'))
    }

    return(
        <div id='deleteTaskModalContainer' className='deleteTaskModalContainer'>
            <div id='deleteTaskModalTitle'>Delete Task?</div>
            <div id='deleteTaskModalText'>Do you really want to delete this task?</div>
            <div id='deleteTaskModalCannotBeUndone'>*This cannot be undone*</div>
            <div id='deleteTaskModalCancel' onClick={handleCloseDeleteTask}>Cancel</div>
            <div id='deleteTaskModalConfirm' onClick={confirmDelete}>Yes, Delete!</div>
        </div>
    )
} 

export default DeleteTaskModal;