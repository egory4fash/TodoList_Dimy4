import React, {ChangeEvent, useState,KeyboardEvent} from "react";
import {FilterValuesType} from "./App";
import './App.css'


export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
type TodoListPropsType = {
    title: string
    tasks: Array<TasksType>
    deleteTask: (id: string) => void
    setFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void

}

export const TodoList = (props: TodoListPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')


    const JSXElems = props.tasks.map(t =>
        <li key={t.id}>
            <input type="checkbox" checked={t.isDone}/>
            <span>
        {t.title}
    </span>
            <button onClick={() => {
                props.deleteTask(t.id)
            }}>x
            </button>
        </li>)

    const inputTask = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>
    ) => {

        if (e.key === "Enter") {
            props.addTask(newTaskTitle);
            setNewTaskTitle('')
        }
    }
    const onClickHandler = () => {
        props.addTask(newTaskTitle);
        setNewTaskTitle('')
    }

    const onAllClickHandler = () => {props.setFilter('all')}
    const onActiveClickHandler = () => {props.setFilter('active')}
    const onCompleteClickHandler = () => {props.setFilter('completed')}

    return (
        <div className="todolist">
            <h3>
                {props.title}
                <div>
                    <input value={newTaskTitle}
                           onChange={inputTask}
                           onKeyPress={onKeyPressHandler}/>

                    <button
                        onClick={onClickHandler}>+
                    </button>
                </div>
                <ul>
                    {JSXElems}

                </ul>
                <div>
                    <button onClick={onAllClickHandler}>All
                    </button>
                    <button onClick={onActiveClickHandler}>Active
                    </button>
                    <button onClick={onCompleteClickHandler}>Completed
                    </button>
                </div>
            </h3>
        </div>
    )
}