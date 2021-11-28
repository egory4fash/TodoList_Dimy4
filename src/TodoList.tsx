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
        }
    }
    return (
        <div className="todolist">
            <h3>
                {props.title}
                <div>
                    <input value={newTaskTitle}
                           onChange={inputTask}/>
                    <button
                        onKeyPress={onKeyPressHandler}


                        onClick={() => {
                            props.addTask(newTaskTitle);
                            setNewTaskTitle('')

                        }}>+
                    </button>
                </div>
                <ul>
                    {JSXElems}

                </ul>
                <div>
                    <button onClick={() => {
                        props.setFilter('all')
                    }}>All
                    </button>
                    <button onClick={() => {
                        props.setFilter('active')
                    }}>Active
                    </button>
                    <button onClick={() => {
                        props.setFilter('completed')
                    }}>Completed
                    </button>
                </div>
            </h3>
        </div>
    )
}