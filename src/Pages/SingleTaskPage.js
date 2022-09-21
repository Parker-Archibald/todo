import React, {useState, useEffect} from 'react';
import { useLocation } from "react-router-dom"
import '../Styles/SingleTaskPage.css';
import ItemSingle from '../Components/ItemSingle';
import AddToDoModal from '../Components/AddToDoModal';
import DeleteTaskModal from '../Components/DeleteTaskModal';
import { TODO_API } from '../COM/com';

const SingleTaskPage = () => {

    const location = useLocation(); 
    const {from} = location.state;

    const [state, setState] = useState({
        task_name: location.state.task_name,
        date: location.state.date,
        todos: location.state.todos,
        mappedData: []
    })

    const dateObj = new Date(state.date);
    const month = dateObj.toLocaleString('default', { month: 'long' });
    const newdate = month + ' ' + dateObj.getDate();

    useEffect(() => {
        getTodos();
    }, [])

    async function getTodos() {
        let userId = document.cookie;
        userId = userId.split('=');

        await fetch(`${TODO_API}getTodos/${userId[1]}/${state.task_name}`)
        .then(results => results.json())
        .then(results => results.map(data => <ItemSingle info={data}/>))
        .then(results => setState(previousData => {
            return {...previousData, mappedData: results}
        }))
    }

    const handleOpenModal = () => {
        document.getElementById('singleTaskPageTaskItemModal').className = 'singleTaskPageTaskItemModalAfter';
        document.getElementById('singleTaskPageContainer').style = 'filter: blur(4px)';
    }

    const handleOpenDeleteTask = () => {
        document.getElementById('deleteTaskModalContainer').className = 'deleteTaskModalContainerAfter';
        document.getElementById('singleTaskPageContainer').style = 'filter: blur(4px)';
    }

    return(
        <div id='singleTaskAll'>
            <div id='singleTaskPageContainer'>
            <div id='singleTaskPageTop'>
                <div id='singleTaskPageTaskName'>{state.task_name}</div>
                <div id='singleTaskPageTaskDate'>{newdate}</div>
                <div id='singleTaskPageDeleteTask' onClick={handleOpenDeleteTask}>Delete Task</div>
                <div id='singleTaskPageAddTask' onClick={handleOpenModal}>Add To Do</div>'
            </div>
            {/* <div id='singleTaskPageTaskItem'><ItemSingle info={state}/></div> */}
            <div id='uncompletedList'>
                <div id='uncompletedTitle'>Uncompleted</div>
                <div id='todoList'>{state.mappedData}</div>
            </div>
            <div id='completedList'>
                <div id='completedTitle'>Completed</div>
            </div>
        </div>
            <div><AddToDoModal info={state}/></div>
            <div><DeleteTaskModal info={state}/></div>
        </div>
    )
}

export default SingleTaskPage;