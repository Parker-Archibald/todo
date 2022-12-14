import { TODO_API } from '../COM/com';
import React, {useState} from 'react';
import '../Styles/SingleTaskPage.css';
import { useLocation } from "react-router-dom";


const AddToDoModal = (props) => {   

    let userId = document.cookie;
    userId = userId.split('=');

   const [item, setItem] = useState({
    task_name: props.info.task_name,
    todo_name: "",
    time: "",
    notes: "",
    isCompleted: false,
    userId: userId[1]
   })

    const closeModal = () => {
        document.getElementById('singleTaskPageTaskItemModal').className = 'singleTaskPageTaskItemModalAfterClose';
        document.getElementById('singleTaskPageContainer').style = 'filter: blur(0px)';
    }

    // const handleSubmitToDo = () => {
        
        // fetch(`${TODO_API}putToDo/${props.info.task_name}`, {
        //     method: "PUT",
        //     headers: {
        //         "Content-Type": 'application/json'
        //     },
        //     body: JSON.stringify(item)
        // })
        // .then(response => {return response.json()})
        // .then(response => alert(response))
        // .then(refresh(200));

    // }

    async function handleSubmitToDo() {
        await fetch(`${TODO_API}newTodo/${item.task_name}`, {
            method: "Post",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(item)
        })
        .then(results => {return results.json()})
        .then(response => alert(response))
        .then(refresh(200))
    }

    const handleInputChange = (e) => {
        setItem(previousState => {
            return {...previousState, [e.target.name]: e.target.value}
        })
    }

    const refresh = (timeoutPeriod) => {
        setTimeout("document.location.reload(true)", timeoutPeriod);
    };

    return(
        <div id='singleTaskPageTaskItemModal' className='singleTaskPageTaskItemModal'>
            <div id='singleTaskPageTaskItemModalTitle'>
                To Do Item
            </div>
            <div id='singleTaskPageTaskItemModalCloseButton' onClick={closeModal}>
                Close
            </div>
            <form id='singleTaskPageTaskItemModalForm'>
                <input id='singleTaskPageTaskItemModalName' placeholder='Name' name='todo_name' onChange={handleInputChange}/>
                <input id='singleTaskPageTaskItemModalDue' type='time' name='time' onChange={handleInputChange}/>
                <textarea id='singleTaskPageTaskItemModalNotes' placeholder='Notes' name='notes' onChange={handleInputChange}/>
            <div id='singleTaskPageTaskItemModalSubmit' onClick={handleSubmitToDo}>Submit</div>
            </form>
        </div>
    ) 
}

export default AddToDoModal;