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

        let userId = document.cookie;
        userId = userId.split('=')

        fetch(`${TODO_API}getAllTasks/${userId[1]}`)
        .then(results => results.json())
        .then(tasks => tasks.map(task => <ToDoSingle allTasks={task}/>))
        .then(tasks => this.setState({singleTask: tasks}));

        const date = new Date();

        document.getElementById('dateRingDate').innerHTML = date.getDate();

        const dayNumber = date.getDay();
            

        if(dayNumber !== 0) {
            let dayDate = date.getDate();

            for(let i = dayNumber - 1; i >= 0; i--) {
                document.getElementById(i).innerHTML = dayDate - 1;
                dayDate -= 1;
            }
        }
        if(dayNumber !== 6) {
            let dayDate = date.getDate();

            for(let i = dayNumber + 1; i <= 6; i++) {
                document.getElementById(i).innerHTML = dayDate + 1;
                dayDate += 1;
            }
        }

        // Monday

        if(date.getDay() === 1) {
            document.getElementById('dateRing').style = 'left: 13.9vw';

        }

        // Tuesday

        else if(date.getDay() === 2) {
            document.getElementById('dateRing').style = 'left: 26.7vw';
        }

        // Wednesday

        else if(date.getDay() === 3) {
            document.getElementById('dateRing').style.left = '39.5vw';
        }

        // Thursday

        else if(date.getDay() === 4) {
            document.getElementById('dateRing').style = 'left: 52.5vw';
        }

        // Friday

        else if(date.getDay() === 5) {
            document.getElementById('dateRing').style = 'left: 65vw';
        }

        // Saturday

        else if(date.getDay() === 6) {
            document.getElementById('dateRing').style = 'left: 78vw';
        }
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
                        <div id='tasksWeekCalendarSunday'>S<div id='0'/></div>
                        <div id='tasksWeekCalendarMonday'>M<div id='1'></div></div>
                        <div id='tasksWeekCalendarTuesday'>T<div id='2'></div></div>
                        <div id='tasksWeekCalendarWednesday'>W<div id='3'></div></div>
                        <div id='tasksWeekCalendarThursday'>TH<div id='4'></div></div>
                        <div id='tasksWeekCalendarFriday'>F<div id='5'></div></div>
                        <div id='tasksWeekCalendarSaturday'>S<div id='6'></div></div>
                        <div id='dateRing'><div id='dateRingDate'/></div>
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