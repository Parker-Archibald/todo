import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import '../Styles/UpdateTodo.css';
import {TODO_API} from '../COM/com';

const UpdateTodo = (props) => {

    const location = useLocation();
    const {from} = location.state;

    const [todo, setTodo] = useState({
        todoId: props.info.todoId,
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

    const handleChange = (e) => {
        setTodo(previousData => {
            return {...previousData, [e.target.name]: e.target.value}
        })
    }

    async function handleConfirm() {
        await fetch(`${TODO_API}updateTodo/${todo.todoId}`, {
            method: "PUT",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(todo)
        })
        .then(alert("Todo Updated"))
        .then(setTimeout("document.location.reload(true)", 200))
    }

    return(
        <div id={`${todo.todo_name}updateContainer`} className='updateContainer'>
            <div id='updateTodoTitle'>
                Update {todo.todo_name}
            </div>
            <div id='updateTodoName'>
                Name: <input id='todoNameInput' name='todo_name' placeholder={todo.todo_name} onChange={handleChange}/>
            </div>
            <div id='updateTodoTime'>
                Due by: <input id='updateDueBy' name='time' placeholder={todo.time} onChange={handleChange}/>
            </div>
            <div id='updateTodoNotes'>
                Notes: <input id='updateNotes' name='notes' placeholder={todo.notes} onChange={handleChange}/>
            </div>
            <div id='updateButtons'>
                <div id='updateConfirm' onClick={handleConfirm}>Confirm</div>
                <div id='updateCancel' onClick={closeUpdate}>Cancel</div>
            </div>
        </div>
    )
}

export default UpdateTodo;