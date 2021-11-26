import React, {useState} from 'react';
import './App.css';
import {TasksType, TodoList} from "./TodoList";


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
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Redux', isDone: false}])

    let [filter,setFilter] = useState<FilterValuesType>('all')

    const deleteTask = (id: number) => {
        let newTasks = tasks1.filter(t => t.id !== id)
        setTasks(newTasks)
    }

    let tasksForTodoList = tasks1
    if (filter === 'completed')
    {
        tasksForTodoList = tasks1.filter(t => t.isDone === true)
    }
    if (filter === 'active') {
        tasksForTodoList = tasks1.filter(t => t.isDone === false)
    }



    return (
        <div className="App">
            <TodoList
                title='What to learn'
                tasks={tasksForTodoList}
                deleteTask={deleteTask}
                setFilter = {setFilter}
                />
            {/*<TodoList*/}
            {/*    title='Movies'*/}
            {/*    tasks={tasks2}/>*/}
        </div>
    );
}

export default App;
