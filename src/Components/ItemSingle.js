import React, {useEffect, useState} from 'react';
import { useLocation } from "react-router-dom"
import '../Styles/SingleItem.css';
import {IoIosArrowForward, IoIosArrowDown} from 'react-icons/io';
import { TODO_API } from '../COM/com';
import '../Styles/EditToDoModal.css';
import '../Styles/DeleteTodoModal.css';

const ItemSingle = () => {

    const location = useLocation(); 
    const {from} = location.state;
    const allItems = location.state.info;


    const [allInfo, setInfo] = useState({
        all: allItems,
        items: allItems.items,
        isCompleted: allItems.isCompleted,
        todo_name: '',
        time: '',
        notes: ''
    });


    // useEffect(() => {
    //     fetch(`${TODO_API}/getTask/${allInfo.all.task_name}`)
    //     .then(response => {return response.json()})
    //     .then(response => response.map(task => {
    //         setInfo(previousData => {
    //             return {...previousData, items: task.items}
    //         })
    //     }))

    //     allInfo.items.map(item => {

    //         if(item.isCompleted === true || item.isCompleted === 'true') {
    //             document.getElementById(`${item.todo_name}CheckBox`).checked = true;
    //         }
    //     })

    // })
    
    const handleUpdateCheckbox = (e) => {

        const checkboxChecked = document.getElementById(e.target.id).checked;
        
        fetch(`${TODO_API}/isCompleted/${allInfo.all.task_name}/${e.target.name}/${checkboxChecked}`, {
            method: "PUT",
            headers: {
                "Content-Type": 'application/json'
        }
        }, [])
        .then(refresh(200));
    }

    const refresh = (timeoutPeriod) => {
        setTimeout("document.location.reload(true)", timeoutPeriod);
    };

    
    const handleOpenTodo = (e) => {
            if(document.getElementById(e.target.id).parentElement.style.isOpened === 'false') {
                document.getElementById(e.target.id).parentElement.style.animation = 'openTask .25s forwards';
                document.getElementById(`${e.target.id}Arrow`).style.color = 'white';
                document.getElementById(e.target.id).parentElement.style.isOpened = 'true'
            }
            else {
                document.getElementById(e.target.id).parentElement.style.isOpened = 'false';
                document.getElementById(e.target.id).parentElement.style.animation = 'closeTask .25s forwards';
                document.getElementById(`${e.target.id}Arrow`).style.color = 'gray';
            }
    }

    
    const handleDeleteButtonClose = (e) => {
        document.getElementById('deleteTodoModalContainer').className = 'deleteTodoModalContainerAfterClose';
    }

    const mappedItems = allInfo.items.map(item => {

        const handleEditButton = (e) => {
            document.getElementById('editTodoModalContainer').className = 'editTodoModalContainerAfter';
            console.log(e.target.className);
            for(let i = 0; i < allInfo.items.length; i++) {
                if(allInfo.items[i].todo_name === e.target.className) {
                    // console.log(allInfo.items[i]);
                    const dataForModal = {
                        todo_name: allInfo.items[i].todo_name,
                        time: allInfo.items[i].time,
                        notes: allInfo.items[i].notes
                    }

                    document.getElementById('editTodoModalNameInput').placeholder = dataForModal.todo_name;
                    document.getElementById('editTodoModalTimeInput').placeholder = dataForModal.time;
                    document.getElementById('editTodoModalNotesInput').placeholder = dataForModal.notes;

                    console.log(dataForModal)
                }
            }
        }

        const handleDeleteButton = (e) => {
            document.getElementById('deleteTodoModalTodo_name').innerHTML = e.target.className + '?';
            document.getElementById('deleteTodoModalContainer').className = 'deleteTodoModalContainerAfter';
            document.getElementById('confirmDelete').className = e.target.className;
        }

        return(
            <div>
                <div id={`${item.todo_name}Container`} name='closed' style={{ 
                position: 'relative',
                marginTop: '4vw',
                height: '8vw',
                width: '88vw',
                left: '6vw',
                borderRadius: '10px',
                backgroundColor: 'white',
                lineHeight: '1vw',
                boxShadow: '2px 2px 4px 1px gray',
                overflow: 'hidden',
                isOpened: 'false'
                }}>
                <input type='checkbox' id={`${item.todo_name}CheckBox`} name={item.todo_name} onClick={handleUpdateCheckbox} style={{
                    position: 'absolute',
                    width: '3vw',
                    height: '3vw',
                    top: '2vw',
                    left: '2vw',
                }}/>
                <div id={item.todo_name} onClick={handleOpenTodo} style={{
                    position: 'absolute',
                    left: '10vw',
                    width: '85%',
                    height: '100%',
                    lineHeight: '7vw',
                    overflow: 'scroll',
                }}>
                    {item.todo_name}
                </div>
                <div id={`${item.todo_name}Arrow`} style={{
                    position: 'absolute',
                    left: '80vw',
                    top: '2vw',
                    color: 'gray'
                }}><IoIosArrowForward/></div>
                <div id={`${item.todo_name}dueBy`} style={{
                    position: 'relative',
                    top: '12vw',
                    left: '55vw',
                }}>
                    Due by: {item.time}
                </div>
                <div id={`${item.todo_name}notes`} style={{
                    position: 'relative',
                    top: '11vw',
                    left: '6vw'
                }}>
                    Notes: <br/>
                    <div id={`${item.todo_name}textArea`} style={{
                        position: 'relative',
                        top: '4vw',
                        width: '85%',
                        height: '40px',
                        border: '1px solid black',
                        overflow: 'scroll',
                        lineHeight: '20px',
                        textIndent: '2vw'
                    }}>    {item.notes} 
                    </div>
                    <div id={`${item.todo_name}EditButton`} className={item.todo_name} onClick={handleEditButton} style={{
                    position: 'relative', 
                    backgroundColor: 'var(--theme-color',
                    top: '4vw',
                    left: '22vw',
                    marginTop: '2vw',
                    width: '16vw',
                    height: '5vw',
                    lineHeight: '4vw',
                    textAlign: 'center',
                    borderRadius: '2px',

                }}>
                    Edit
                </div>
                <div id={`${item.todo_name}DeleteButton`} className={item.todo_name} onClick={handleDeleteButton} style={{
                    position: 'relative', 
                    backgroundColor: 'var(--theme-color',
                    left: '37vw',
                    top: '-3vw',
                    marginTop: '2vw',
                    width: '16vw',
                    height: '5vw',
                    lineHeight: '4vw',
                    textAlign: 'center',
                    borderLeft: '1px solid gray',
                    borderRadius: '2px',
                }}>
                    Delete
                    </div>
                </div>
                
            </div>
        </div>
            
        )
    })

    const changeLineColor = (e) => {
        document.getElementById(e.target.id).style.borderBottom = '1px solid var(--theme-color';
    }

    const handleCloseEditModal = (e) => {
        document.getElementById('editTodoModalContainer').className = 'editTodoModalContainerAfterClose';
    }

    const handleConfirmDelete = (e) => {
        const todoItem = document.getElementById('confirmDelete').className;

         fetch(`${TODO_API}/deleteTodo/${allInfo.all.task_name}/${todoItem}`, {
            method: 'Delete', 

        })
        .then(response => response.json())
        .then(refresh(200))
    }

    const handleEditChange = (e) => {
        setInfo(previousData => {
            return {...previousData, [e.target.className]: e.target.value}
        })
    }
    
    const handleSubmitEdit = () => {

        const oldTodoName = document.getElementById('editTodoModalNameInput').placeholder;

        let oldData = {
            todo_name: allInfo.todo_name,
            time: allInfo.time,
            notes: allInfo.notes
        }
        
        fetch(`${TODO_API}/updateTodo/${allItems.task_name}/${oldTodoName}`, {
            method: "Put",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(oldData)
        })
        .then(refresh(200));
    }

    return(
        <div>
            <div id='singleItemContainer'>
                {mappedItems}  
            </div>
            <div id='editTodoModalContainer' className='editTodoModalContainer'>       
                <div id='editTodoModalTitle'>
                    Modal
                </div>
                <div id='editTodoModalClose' onClick={handleCloseEditModal}>
                    Close
                </div>
                <div id='editTodoModalName'>
                    Name: 
                    <input id='editTodoModalNameInput' placeholder='' className='todo_name' onClick={changeLineColor} onChange={handleEditChange}/>
                </div>
                <div id='editTodoModalTime'>
                    Due By:
                    <input id='editTodoModalTimeInput' type='time' className='time' onChange={handleEditChange}/>
                </div>
                <div id='editTodoModalNotes'>
                    Notes:
                </div>
                <textarea id='editTodoModalNotesInput' className='notes' onChange={handleEditChange}/> 
                <div id='editTodoModalSubmit' onClick={handleSubmitEdit}>Submit</div>
            </div>
            <div id='deleteTodoModalContainer' className='deleteTodoModalContainer'>
                <div id='deleteTodoModalTitle'>Delete Todo?</div>
                <div id='deleteTodoModalQ'>
                    Are you sure you want to delete <div id='deleteTodoModalTodo_name'/>
                    <div id='deleteConfirm' onClick={handleConfirmDelete}>This cannot be undone!</div>
                    <div id='confirmDelete'>Yes, delete it!</div>
                    <div id='cancelDelete' onClick={handleDeleteButtonClose}>Cancel!</div>
                </div>
            </div>
        </div>
    )
}

export default ItemSingle;

    