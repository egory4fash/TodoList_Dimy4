import React, {ChangeEvent} from "react";
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
    updateTitle: (todolistID: string, taskID: string, newTitle: string) => void
    changeTitle: (todolistID: string, newTitle: string) => void
}

export const TodoList = (props: TodoListPropsType) => {
    const getNewTitleHandler = (newTitle: string,taskID:string) => {
        props.updateTitle(props.todolistID, taskID, newTitle)
    }
    const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>,taskID:string) => {
        props.changeTaskStatus(props.todolistID, taskID, e.currentTarget.checked)
    }


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
    const changeTodoListTitle = (newTitle: string) => {
        props.changeTitle(props.todolistID, newTitle)
    }


    const JSXElems = props.tasks.map(t => {

        return (
            <li key={t.id}
                className={t.isDone ? "isDone" : ''}>
                <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={(e) =>onChangeCheckboxHandler(e,t.id)}
                />
                <EditableSpan title={t.title} callBack={(newtitle) => getNewTitleHandler(newtitle,t.id)}/>
                <button onClick={() => {
                    props.deleteTask(props.todolistID, t.id)
                }}>x
                </button>
            </li>)
    })



    return (
        <div className="todolist">
            <h3>
                <EditableSpan title={props.title} callBack={changeTodoListTitle}/>
                <button onClick={removeHandler}>X</button>
                <div>
                    <Input callBack={addTaskHandler}/>
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