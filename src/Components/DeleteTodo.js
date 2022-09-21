import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import {TODO_API} from '../COM/com';
import '../Styles/DeleteTodo.css';

const DeleteTodo = (props) => {

    const [todo, setTodo] = useState({
        todoId: props.info.todoId,
        todo_name: props.info.todo_name,
        time: props.info.time,
        notes: props.info.notes,
        isCompleted: props.info.isCompleted
    })

    // useEffect(() => {
    //     console.log(todo.todoId)
    // }, [])

    const closeDelete = () => {
        document.getElementById(`${todo.todo_name}deleteTodoContainer`).className = 'deleteTodoContainer';
    }

    async function confirmDelete() {
        await fetch(`${TODO_API}deleteTodo/${todo.todoId}`, {
            method: 'Delete', 
        })
        .then(alert('Todo deleted'))
        .then(setTimeout("document.location.reload(true)", 200))
    }

    return(
        <div id={`${todo.todo_name}deleteTodoContainer`} className='deleteTodoContainer'>
            <div id='deleteTitle'>DeleteTodo</div>
            <div id='deleteText'>Are you sure you want to delete {todo.todo_name}?</div>
            <div id='deleteWarning'>*This cannot be undone!</div>
            <div id='deleteButtons'>
                <div id='confirmDelete' onClick={confirmDelete}>Delete!</div>
                <div id='cancelDelete' onClick={closeDelete}>Cancel</div>
            </div>
        </div>
    )
}

export default DeleteTodo;