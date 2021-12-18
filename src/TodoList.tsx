import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuesType} from "./App";
import './App.css'
import {Input} from "./Input";
import {EditableSpan} from "./EditableSpan";


export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
type TodoListPropsType = {
    title: string
    tasks: Array<TasksType>
    deleteTask: (todolistID: string, id: string) => void
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskID: string, isDone: boolean) => void
    filter: FilterValuesType
    todolistID: string
    removeTodolist: (todolistID: string) => void

}

export const TodoList = (props: TodoListPropsType) => {


    const JSXElems = props.tasks.map(t => {

        const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(props.todolistID, t.id, e.currentTarget.checked)
        }
        return (
            <li key={t.id}
                className={t.isDone ? "isDone" : ''}>
                <input type="checkbox"
                       checked={t.isDone}
                       onChange={onChangeCheckboxHandler}
                />
                <EditableSpan title = {props.title} />
                <button onClick={() => {
                    props.deleteTask(props.todolistID, t.id)
                }}>x
                </button>
            </li>)
    })


    const onAllClickHandler = () => {
        props.changeFilter('all', props.todolistID)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.todolistID)
    }
    const onCompleteClickHandler = () => {
        props.changeFilter('completed', props.todolistID)
    }
    const removeHandler = () => {
        props.removeTodolist(props.todolistID)
    }

    const addTaskHandler = (title: string) => {
        props.addTask(props.todolistID, title)
    }
    return (
        <div className="todolist">
            <h3>
                {props.title}
                <button onClick={removeHandler}>X</button>
                <div>
                    <Input
                        callBack={addTaskHandler}/>
                </div>
                <ul>
                    {JSXElems}

                </ul>
                <div>
                    <button
                        onClick={onAllClickHandler}
                        className={props.filter === 'all' ? 'active-filter' : ''}>All
                    </button>
                    <button
                        onClick={onActiveClickHandler}
                        className={props.filter === 'active' ? 'active-filter' : ''}>Active
                    </button>
                    <button
                        onClick={onCompleteClickHandler}
                        className={props.filter === 'completed' ? 'active-filter' : ''}>Completed
                    </button>
                </div>
            </h3>
        </div>
    )
}