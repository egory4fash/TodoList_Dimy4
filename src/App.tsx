import React, {useState} from 'react';
import './App.css';
import {TasksType, TodoList} from "./TodoList";
import {v1} from 'uuid'
import {Input} from "./Input";


export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = { id: string, title: string, filter: FilterValuesType }
export type TasksStateType = {
    [key: string]: Array<TasksType>
}

export function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false}],
        [todolistID2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Coffee', isDone: true},
            {id: v1(), title: 'Beer', isDone: false},
            {id: v1(), title: 'Vodke', isDone: false}]
    })

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: "What to learn", filter: 'all'},
        {id: todolistID2, title: "What to buy", filter: 'active'}
    ])


    const deleteTask = (todolistID: string, id: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(f => f.id !== id)})
    }

    const addTask = (todolistID: string, title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        // setTasks([newTask, ...tasks1])
        setTasks({...tasks, [todolistID]: tasks[todolistID] = [newTask, ...tasks[todolistID]]})
    }

    const changeTaskStatus = (todolistID: string, taskID: string, isDone: boolean) => {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map(m => m.id === taskID ? {...m, isDone: isDone} : {...m})
        })
    }
    const changeFilter = (value: FilterValuesType, todolistID: string) => {
        setTodolists(todolists.map(m => m.id === todolistID ? {...m, filter: value} : {...m}))
    }


    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(f => f.id !== todolistID))
    }

    const addTodoList = (title: string) => {
        let newTodoList: TodolistType = {id: v1(), title: title, filter: "all"}
        setTodolists([newTodoList, ...todolists])
        setTasks({...tasks, [newTodoList.id]: []})
    }
const todoListMapper =
    todolists.map(m => {
            let tasksForTodoList = tasks[m.id]
            if (m.filter === 'completed') {
                tasksForTodoList = tasks[m.id].filter(t => t.isDone)
            }
            if (m.filter === 'active') {
                tasksForTodoList = tasks[m.id].filter(t => !t.isDone)
            }
            return (
                <TodoList
                    key={m.id}
                    todolistID={m.id}
                    title={m.title}
                    tasks={tasksForTodoList}
                    deleteTask={deleteTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    filter={m.filter}
                    removeTodolist={removeTodolist}
                />
            )
        })


    return (
        <div className="App">
            <Input callBack={addTodoList}/>
            {todoListMapper}


        </div>
    );
}


