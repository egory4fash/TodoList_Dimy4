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
export type TodolistType = {id:string,title:string,filter:FilterValuesType}
export type TodolistsType =Array<TodolistType>
function App() {


    let [tasks1, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false}])



    const deleteTask = (id: string) => {
        let newTasks = tasks1.filter(t => t.id !== id)
        setTasks(newTasks)
    }

    const addTask = (title:string) => {
        let newTask = { id:v1(),title:title,isDone: false}
        setTasks([newTask, ...tasks1])
    }

    const changeTaskStatus = (taskID:string,isDone:boolean) => {
        let tsk = tasks1.find(t => t.id ===taskID)
        if (tsk) {
        tsk.isDone = isDone}
        setTasks([...tasks1])
    }


let todolists:TodolistsType = [
    {id:v1(), title : "What to learn", filter :'all'},
    {id:v1(), title : "What to buy", filter :'active'}
]


    return (
        <div className="App">
            {todolists.map(m => {
                let tasksForTodoList = tasks1
                if (m.filter === 'completed')
                {
                    tasksForTodoList = tasks1.filter(t => t.isDone)
                }
                if (m.filter === 'active') {
                    tasksForTodoList = tasks1.filter(t => !t.isDone)
                }
               return (
                   <TodoList
                       title={m.title}
                       tasks={tasksForTodoList}
                       deleteTask={deleteTask}
                       setFilter = {setFilter}
                       addTask = {addTask}
                       changeTaskStatus = {changeTaskStatus}
                       filter = {m.filter}
                   />
               )
            })
            }



        </div>
    );
}

export default App;
