import React, {useState} from 'react';
import './App.css';
import {TasksType, TodoList} from "./TodoList";
import {v1} from 'uuid'


// let tasks1: Array<TasksType> = [
//     {id: 1, title: 'HTML', isDone: true},
//     {id: 2, title: 'CSS', isDone: true},
//     {id: 3, title: 'React', isDone: false},
//     {id: 4, title: 'Redux', isDone: false}
// ]
//
// const tasks2: Array<TasksType> = [
//     {id: 1, title: 'It', isDone: true},
//     {id: 2, title: 'Venom', isDone: true},
//     {id: 3, title: 'Mist', isDone: false}
// ]
export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {


    let [tasks1, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false}])

    let [filter,setFilter] = useState<FilterValuesType>('all')

    const deleteTask = (id: string) => {
        let newTasks = tasks1.filter(t => t.id !== id)
        setTasks(newTasks)
    }

    const addTask = (title:string) => {
        let newTask = { id:v1(),title:title,isDone: false}
        setTasks([newTask, ...tasks1])

    }

    let tasksForTodoList = tasks1
    if (filter === 'completed')
    {
        tasksForTodoList = tasks1.filter(t => t.isDone)
    }
    if (filter === 'active') {
        tasksForTodoList = tasks1.filter(t => !t.isDone)
    }



    return (
        <div className="App">
            <TodoList
                title='What to learn'
                tasks={tasksForTodoList}
                deleteTask={deleteTask}
                setFilter = {setFilter}
                addTask = {addTask}
                />


        </div>
    );
}

export default App;
