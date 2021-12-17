import React, {ChangeEvent, useState, KeyboardEvent} from "react";
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
    changeFilter: (value: FilterValuesType,todolistID:string) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
    filter: FilterValuesType
    todolistID:string

}

export const TodoList = (props: TodoListPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<null | string>(null)


    const JSXElems = props.tasks.map(t => {

        const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked)
        }
        return (
            <li key={t.id}
                className = {t.isDone ? "isDone" : ''}>
                <input type="checkbox"
                       checked={t.isDone}
                       onChange={onChangeCheckboxHandler}
                />
                <span>
        {t.title}
    </span>
                <button onClick={() => {
                    props.deleteTask(t.id)
                }}>x
                </button>
            </li>)
    })

    const inputTask = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>
    ) => {
        setError(null)
        if (e.key === "Enter" && newTaskTitle.trim() !== "") {
            props.addTask(newTaskTitle);
            setNewTaskTitle('')
        }
    }

    const onClickHandler = () => {
        if (newTaskTitle.trim() !== "") {
            props.addTask(newTaskTitle.trim());
            setNewTaskTitle('')
        } else {
            setError("Title ts required")
            return
        }
    }

    const onAllClickHandler = () => {
        props.changeFilter('all',props.todolistID)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active',props.todolistID)
    }
    const onCompleteClickHandler = () => {
        props.changeFilter('completed',props.todolistID)
    }

    return (
        <div className="todolist">
            <h3>
                {props.title}
                <div>
                    <input value={newTaskTitle}
                           onChange={inputTask}
                           onKeyPress={onKeyPressHandler}
                           className={error ? 'error' : ''}/>


                    <button
                        onClick={onClickHandler}>+
                    </button>
                    {error && <div className='error-message'>Title is required</div>}
                </div>
                <ul>
                    {JSXElems}

                </ul>
                <div>
                    <button onClick={onAllClickHandler}
                            className={props.filter === 'all' ? 'active-filter' : ''}>All
                    </button>
                    <button onClick={onActiveClickHandler}
                            className={props.filter === 'active' ? 'active-filter' : ''}>Active
                    </button>
                    <button onClick={onCompleteClickHandler}
                            className={props.filter === 'completed' ? 'active-filter' : ''}>Completed
                    </button>
                </div>
            </h3>
        </div>
    )
}