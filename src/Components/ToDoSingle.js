import React, {Component} from 'react';
import '../Styles/ToDoSingle.css';
import {Link} from 'react-router-dom';
import {TODO_API} from '../COM/com';

class ToDoSingle extends Component {

    constructor(props) {
        super(props);

        this.state = {
            allInfo: this.props.allTasks,
            task_name: this.props.allTasks.task_name,
            date: this.props.allTasks.date,
            time: this.props.allTasks.time,
            notes: this.props.allTasks.notes,
            // items: this.props.allTasks.items,
            items: [],
            completedItems: 0,
        }
    }

    componentDidMount = () => {
        this.getTodos();
    }

    async getTodos() {
        await fetch(`${TODO_API}getTodos/${this.state.allInfo.userId}/${this.state.task_name}`)
        .then(results => results.json())
        .then(results => {
            this.setState({items: results})
        })

        this.progressBar();  
    }

    progressBar() {

        const allItems = this.state.items;
        const itemsLength = allItems.length;
        let completedTodos = 0;  

         for(let i = 0; i < itemsLength; i++) { 
                if(allItems[i].isCompleted === true || allItems[i].isCompleted === 'true') {
                    completedTodos += 1;
                }
                if(i + 1 === itemsLength) {
                    this.setState({completedItems: completedTodos}) 

                    let progressPercent = (completedTodos / itemsLength) * 100;
                    progressPercent = progressPercent.toFixed(2) + "%";

                    document.getElementById(`${this.state.task_name}taskCountBarInner`).style.width = progressPercent;
                    document.getElementById(`${this.state.task_name}taskCountNumber`).innerHTML = `${completedTodos}/${itemsLength}`;

                    completedTodos = 0;
                }
            }        

            if(allItems.length === 0) {
                document.getElementById(`${this.state.task_name}taskCountBarInner`).style.width = '0%';
                document.getElementById(`${this.state.task_name}taskCountNumber`).innerHTML = 0 + '/' + 0;
            }
    }

    render() {
        return(
            <div id='singleTaskContainer'>
                <Link to='/single_task_page' state={{task_name: this.state.task_name, date: this.state.date, todos: this.state.items}} style={{textDecoration: 'none', color: 'black'}}>
                    <div id='taskName'>{this.state.task_name}</div>
                    <div id='taskCountBar'><div id={`${this.state.task_name}taskCountBarInner`} className='taskCountBarInner'></div></div>
                    <div id={`${this.state.task_name}taskCountNumber`} className='taskCountNumber'></div>
                </Link>
            </div>
        )
    }
}

export default ToDoSingle;