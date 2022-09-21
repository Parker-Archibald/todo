import React, {useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";
import {IoIosArrowForward, IoIosArrowDown} from 'react-icons/io';
import { TODO_API } from '../COM/com';
import '../Styles/TODO.css';
import UpdateTodo from '../Components/UpdateTodo';
import DeleteTodo from './DeleteTodo';

const ItemSingle = (props) => {

    const location = useLocation();
    const {from} = location.state;

    const [state, setState] = useState({
        todoId: props.info._id,
        todo_name: props.info.todo_name,
        time: props.info.time,
        notes: props.info.notes,
        isCompleted: props.info.isCompleted
    })

    useEffect(() => {

        if(state.isCompleted === true || state.isCompleted === 'true') {
            document.getElementById(`${state.todo_name}Checkbox`).checked = true;
            const completedList = document.getElementById('completedList');
            const toAppend = document.getElementById(`${state.todo_name}Container`);

            completedList.append(toAppend);

        }

    }, [])

    const handleOpenTodo = () => {
        if(document.getElementById(`${state.todo_name}Container`).className === 'todoContainer' || document.getElementById(`${state.todo_name}Container`).className === 'todoContainerClosed') {
            document.getElementById(`${state.todo_name}Container`).className = 'todoContainerAfter';
            document.getElementById(`${state.todo_name}Arrow`).style = 'display: none';
            document.getElementById(`${state.todo_name}Arrow1`).style = 'display: inherit';
        }
        else {
            document.getElementById(`${state.todo_name}Container`).className = 'todoContainerClosed';
            document.getElementById(`${state.todo_name}Arrow`).style = 'display: inherit';
            document.getElementById(`${state.todo_name}Arrow1`).style = 'display: none';

        }
    }

    async function checkTodo() {

        let isChecked;

        if(document.getElementById(`${state.todo_name}Checkbox`).checked === true) {
            isChecked = true;
            const completedList = document.getElementById('completedList');
            const toAppend = document.getElementById(`${state.todo_name}Container`);

            completedList.append(toAppend);
        }
        else {
            isChecked = false;
            const completedList = document.getElementById('uncompletedList');
            const toAppend = document.getElementById(`${state.todo_name}Container`);

            completedList.append(toAppend);
        }

        await fetch(`${TODO_API}todoCompleted/${state.todoId}/${isChecked}`, {
            method: "PUT",
            headers: {
                "Content-Type": 'application/json'
            }
        })

    }

    const openUpdate = () => {
        document.getElementById(`${state.todo_name}updateContainer`).className = 'updateContainerAfter';
    }

    const openDelete = () => {
        document.getElementById(`${state.todo_name}deleteTodoContainer`).className = 'deleteTodoContainerAfter';
    }

    return(
        <div>
            <div id={`${state.todo_name}Container`} className={`todoContainer`}>
                <div id='todoBox'>
                    <input type='checkbox' id={`${state.todo_name}Checkbox`} className='todoCheckbox' onClick={checkTodo}/>
                    <div id='todoTitle' onClick={handleOpenTodo}>{state.todo_name}</div>
                    <div id={`${state.todo_name}Arrow`} className='todoArrow'><IoIosArrowForward/></div>
                    <div id={`${state.todo_name}Arrow1`} className='todoArrow1'><IoIosArrowDown/></div>
                </div>
                <div id='dueByText'>
                    Due by: <div id='todoTime'>{state.time}</div>
                </div>
                <div id='todoNotesContainer'>
                    Notes: <div id='todoNotes'>{state.notes}</div>
                </div>
                <div id='todoButtons'>
                    <div id='deleteTodo' onClick={openDelete}>Delete</div>
                    <div id='updateTodo' onClick={openUpdate}>Update</div>
                </div>
            </div>
            <div id='updateTodoModal'>
                <UpdateTodo info={state}/>
            </div>
            <div id='deleteTodoModal'>
                <DeleteTodo info={state}/>
            </div>
        </div>
    )
}



export default ItemSingle;

//     const handleDeleteButtonClose = (e) => {
//         document.getElementById('deleteTodoModalContainer').className = 'deleteTodoModalContainerAfterClose';
//     }

//     const mappedItems = allInfo.items.map(item => {

//         const handleEditButton = (e) => {
//             document.getElementById('editTodoModalContainer').className = 'editTodoModalContainerAfter';
//             console.log(e.target.className);
//             for(let i = 0; i < allInfo.items.length; i++) {
//                 if(allInfo.items[i].todo_name === e.target.className) {
//                     // console.log(allInfo.items[i]);
//                     const dataForModal = {
//                         todo_name: allInfo.items[i].todo_name,
//                         time: allInfo.items[i].time,
//                         notes: allInfo.items[i].notes
//                     }

//                     document.getElementById('editTodoModalNameInput').placeholder = dataForModal.todo_name;
//                     document.getElementById('editTodoModalTimeInput').placeholder = dataForModal.time;
//                     document.getElementById('editTodoModalNotesInput').placeholder = dataForModal.notes;

//                     setInfo(previousData => {
//                         return {...previousData, todo_name: dataForModal.todo_name, time: dataForModal.time, notes: dataForModal.notes}
//                     })

//                     console.log(dataForModal)
//                 }
//             }
//         }

//         const handleDeleteButton = (e) => {
//             document.getElementById('deleteTodoModalTodo_name').innerHTML = e.target.className + '?';
//             document.getElementById('deleteTodoModalContainer').className = 'deleteTodoModalContainerAfter';
//             document.getElementById('confirmDelete').className = e.target.className;
//         }

//         return(
//             <div>
//                 <div id={`${item.todo_name}Container`} name='closed' style={{ 
//                 position: 'relative',
//                 marginTop: '4vw',
//                 height: '8vw',
//                 width: '88vw',
//                 left: '6vw',
//                 borderRadius: '10px',
//                 backgroundColor: 'white',
//                 lineHeight: '1vw',
//                 boxShadow: '2px 2px 4px 1px gray',
//                 overflow: 'hidden',
//                 isOpened: 'false'
//                 }}>
//                 <input type='checkbox' id={`${item.todo_name}CheckBox`} name={item.todo_name} onClick={handleUpdateCheckbox} style={{
//                     position: 'absolute',
//                     width: '3vw',
//                     height: '3vw',
//                     top: '2vw',
//                     left: '2vw',
//                 }}/>
//                 <div id={item.todo_name} onClick={handleOpenTodo} style={{
//                     position: 'absolute',
//                     left: '10vw',
//                     width: '85%',
//                     height: '100%',
//                     lineHeight: '7vw',
//                     overflow: 'scroll',
//                 }}>
//                     {item.todo_name}
//                 </div>
//                 <div id={`${item.todo_name}Arrow`} style={{
//                     position: 'absolute',
//                     left: '80vw',
//                     top: '2vw',
//                     color: 'gray'
//                 }}><IoIosArrowForward/></div>
//                 <div id={`${item.todo_name}dueBy`} style={{
//                     position: 'relative',
//                     top: '12vw',
//                     left: '55vw',
//                 }}>
//                     Due by: {item.time}
//                 </div>
//                 <div id={`${item.todo_name}notes`} style={{
//                     position: 'relative',
//                     top: '11vw',
//                     left: '6vw'
//                 }}>
//                     Notes: <br/>
//                     <div id={`${item.todo_name}textArea`} style={{
//                         position: 'relative',
//                         top: '4vw',
//                         width: '85%',
//                         height: '40px',
//                         border: '1px solid black',
//                         overflow: 'scroll',
//                         lineHeight: '20px',
//                         textIndent: '2vw'
//                     }}>    {item.notes} 
//                     </div>
//                     <div id={`${item.todo_name}EditButton`} className={item.todo_name} onClick={handleEditButton} style={{
//                     position: 'relative', 
//                     backgroundColor: 'var(--theme-color',
//                     top: '4vw',
//                     left: '22vw',
//                     marginTop: '2vw',
//                     width: '16vw',
//                     height: '5vw',
//                     lineHeight: '4vw',
//                     textAlign: 'center',
//                     borderRadius: '2px',

//                 }}>
//                     Edit
//                 </div>
//                 <div id={`${item.todo_name}DeleteButton`} className={item.todo_name} onClick={handleDeleteButton} style={{
//                     position: 'relative', 
//                     backgroundColor: 'var(--theme-color',
//                     left: '37vw',
//                     top: '-3vw',
//                     marginTop: '2vw',
//                     width: '16vw',
//                     height: '5vw',
//                     lineHeight: '4vw',
//                     textAlign: 'center',
//                     borderLeft: '1px solid gray',
//                     borderRadius: '2px',
//                 }}>
//                     Delete
//                     </div>
//                 </div>
//             </div>
//         </div>
            
//         )
//     })

//     const handleCloseEditModal = (e) => {
//         document.getElementById('editTodoModalContainer').className = 'editTodoModalContainerAfterClose';
//     }

//     const handleConfirmDelete = (e) => {
//         const todoItem = document.getElementById('confirmDelete').className;

//          fetch(`${TODO_API}deleteTodo/${allInfo.all.task_name}/${todoItem}`, {
//             method: 'Delete', 

//         })
//         .then(response => response.json())
//         .then(refresh(200))
//     }

//     const handleEditChange = (e) => {
//         setInfo(previousData => {
//             return {...previousData, [e.target.className]: e.target.value}
//         })
//     }
    
//     const handleSubmitEdit = () => {

//         const oldTodoName = document.getElementById('editTodoModalNameInput').placeholder;

//         let oldData = {
//             todo_name: allInfo.todo_name,
//             time: allInfo.time,
//             notes: allInfo.notes
//         }
        
//         fetch(`${TODO_API}updateTodo/${allItems.task_name}/${oldTodoName}`, {
//             method: "Put",
//             headers: {
//                 "Content-Type": 'application/json'
//             },
//             body: JSON.stringify(oldData)
//         })
//         .then(refresh(200));
//     }

//     return(
//         <div>
//             <div id='singleItemContainer'>
//                 <div id='uncompletedTodosContainer'><div id='uncompletedTodosList'>Uncompleted<div id='uncompletedTodoUnderline'/></div></div>
//                 {mappedItems}  
//                 <div id='completedItemsContainer'><div id='completedTodosList'>Completed<div id='completedTodosUnderline'/></div></div>
//             </div>
//             <div id='editTodoModalContainer' className='editTodoModalContainer'>       
//                 <div id='editTodoModalTitle'>
//                     Modal
//                 </div>
//                 <div id='editTodoModalClose' onClick={handleCloseEditModal}>
//                     Close
//                 </div>
//                 <div id='editTodoModalName'>
//                     Name: 
//                     <input id='editTodoModalNameInput' placeholder='' className='todo_name' onChange={handleEditChange}/>
//                 </div>
//                 <div id='editTodoModalTime'>
//                     Due By:
//                     <input id='editTodoModalTimeInput' type='time' className='time' onChange={handleEditChange}/>
//                 </div>
//                 <div id='editTodoModalNotes'>
//                     Notes:
//                 </div>
//                 <textarea id='editTodoModalNotesInput' className='notes' onChange={handleEditChange}/> 
//                 <div id='editTodoModalSubmit' onClick={handleSubmitEdit}>Submit</div>
//             </div>
//             <div id='deleteTodoModalContainer' className='deleteTodoModalContainer'>
//                 <div id='deleteTodoModalTitle'>Delete Todo?</div>
//                 <div id='deleteTodoModalQ'>
//                     Are you sure you want to delete <div id='deleteTodoModalTodo_name'/>
//                     <div id='deleteConfirm' onClick={handleConfirmDelete}>This cannot be undone!</div>
//                     <div id='confirmDelete'>Yes, delete it!</div>
//                     <div id='cancelDelete' onClick={handleDeleteButtonClose}>Cancel!</div>
//                 </div>
//             </div>
            
//         </div>
//     )
// }

// export default ItemSingle;

    