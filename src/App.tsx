import React from 'react';
import './App.css';
import {TasksType, TodoList} from "./TodoList";


const tasks1: Array<TasksType> = [
    {id: 1, title: 'HTML', isDone: true},
    {id: 2, title: 'CSS', isDone: true},
    {id: 3, title: 'React', isDone: false}
]

const tasks2: Array<TasksType> = [
    {id: 1, title: 'It', isDone: true},
    {id: 2, title: 'Venom', isDone: true},
    {id: 3, title: 'Mist', isDone: false}
]

function App() {


    return (
        <div className="App">
            <TodoList
                title='What to learn'
                tasks={tasks1}/>
            <TodoList
                title='Movies'
                tasks={tasks2}/>
        </div>
    );
}

export default App;
