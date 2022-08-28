import React, {Component} from 'react';
import '../Styles/Tasks.css';
import ToDoSingle from '../Components/ToDoSingle';
import { TODO_API } from '../COM/com';
import AddTaskFrame from '../Components/AddTaskFrame';

class ToDoList extends Component {

    state = {
        singleTask: ''
    }

    componentDidMount = () => {
        fetch(`${TODO_API}getAllTasks`)
        .then(results => results.json())
        .then(tasks => tasks.map(task => <ToDoSingle allTasks={task}/>))
        .then(tasks => this.setState({singleTask: tasks}))
    }

    handleOpenNewTask = () => {
        document.getElementById('addTaskModalContainer').className = 'addTaskModalContainerAfter' ;
        document.getElementById('tasksContainer').style = 'filter: blur(4px)';
    }

    render(){
        return(
            <div>
                <div id='tasksContainer'>
                <div id='tasksTitleBottomBorder'>
                    <div id='tasksTitle'>Tasks</div>
                    <div id='tasksAddButton' onClick={this.handleOpenNewTask}>New Task</div>
                    <div id='tasksWeekCalendarContainer'>
                        <div id='tasksWeekCalendarSunday'>S</div>
                        <div id='tasksWeekCalendarMonday'>M</div>
                        <div id='tasksWeekCalendarTuesday'>T</div>
                        <div id='tasksWeekCalendarWednesday'>W</div>
                        <div id='tasksWeekCalendarThursday'>TH</div>
                        <div id='tasksWeekCalendarFriday'>F</div>
                        <div id='tasksWeekCalendarSaturday'>S</div>
                    </div>
                </div>
                <div id='singleTaskTasks'>
                    {this.state.singleTask}
                </div>
            </div>
                <div id='addTaskButtonModal'>
                    <AddTaskFrame/>
                </div>
            </div>
        )
        }
}

export default ToDoList;