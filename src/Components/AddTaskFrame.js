import React, {Component} from 'react';
import '../Styles/AddTaskFrame.css';
import { TODO_API } from '../COM/com';

class AddTaskFrame extends Component {

    state = {
        task_name: '',
        date: '',
        time: '',
        notes: ''
    }

    render() {

        const handleExitModal = () => {
            document.getElementById('addTaskModalContainer').className = 'addTaskModalContainerAfterClose';
            document.getElementById('tasksContainer').style = 'filter: blur(0px)';
        }
    
        const handleChange = (e) => {
            this.setState({[e.target.name]: e.target.value});
        }
    
        const handleSubmit = (e) => {
            e.preventDefault();
            fetch(`${TODO_API}postTask`, {
                method: 'Post',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(this.state)
            })
            .then(results => results.json())
            .then(results => console.log(results))
            .then(refresh(200));
        }

        const refresh = (timeoutPeriod) => {
            setTimeout("document.location.reload(true)", timeoutPeriod);
        };

        return (
            <div id='addTaskModalContainer' className='addTaskModalContainer' >
                <div id='addTaskModalExit' onClick={handleExitModal}>Close</div>
                <div id='addTaskModalTitle'>New Task</div>
                <div id='addTaskModalForm'>
                    <form>
                        <input id='addTaskTaskName' name='task_name' placeholder='Task Name' onChange={handleChange}/>
                        <input id='addTaskDate' type='date' name='date' placeholder='Date' onChange={handleChange}/>
                        <input id='addTaskTime' type='time' name='time' placeholder='Due By' onChange={handleChange}/>
                        <textarea id='addTaskNotes' name='notes' onChange={handleChange} placeholder='Notes'/>
                        <div id='addTaskSubmit' onClick={handleSubmit}>Submit</div>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddTaskFrame;