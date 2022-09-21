import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import '../Styles/UpdateTodo.css';

const UpdateTodo = (props) => {

    const location = useLocation();
    const {from} = location.state;

    const [todo, setTodo] = useState({
        todoId: props.info._id,
        todo_name: props.info.todo_name,
        time: props.info.time,
        notes: props.info.notes,
        isCompleted: props.info.isCompleted
    })

    // useEffect(() => {
        
    // }, [])

    const closeUpdate = () => {
        document.getElementById(`${todo.todo_name}updateContainer`).className = 'updateContainer';
    }

    return(
        <div id={`${todo.todo_name}updateContainer`} className='updateContainer'>
            <div id='updateTodoTitle'>
                Update {todo.todo_name}
            </div>
            <div id='updateTodoName'>
                Name: <input id='todoNameInput' placeholder={todo.todo_name}/>
            </div>
            <div id='updateTodoTime'>
                Due by: <input id='updateDueBy' placeholder={todo.time}/>
            </div>
            <div id='updateTodoNotes'>
                Notes: <div id='updateNotes'>{todo.notes}</div>
            </div>
            <div id='updateButtons'>
                <div id='updateConfirm'>Confirm</div>
                <div id='updateCancel' onClick={closeUpdate}>Cancel</div>
            </div>
        </div>
    )
}

export default UpdateTodo;