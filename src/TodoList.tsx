import React from "react";
import {FilterValuesType} from "./App";


export type TasksType = {
    id:number
    title:string
    isDone:boolean
}
type TodoListPropsType = {
    title: string
    tasks:Array<TasksType>
    deleteTask : (id:number) => void
    setFilter : (value:FilterValuesType) => void

}

export const TodoList = (props:TodoListPropsType) => {




    const JSXElems = props.tasks.map(t =>
    <li>
        <input type="checkbox" checked={t.isDone}/>
    <span>
        {t.title}
    </span>
        <button onClick={() => {props.deleteTask (t.id)}}>x</button>
    </li>)

    return (
        <div>
            <h3>
                {props.title}
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {JSXElems}
                {/*    <li><input type="checkbox" checked={props.tasks[0].isDone}/>*/}
                {/*        <span>{props.tasks[0].title}</span>*/}
                {/*    </li>*/}
                {/*    <li><input type="checkbox" checked={props.tasks[1].isDone}/>*/}
                {/*        <span>{props.tasks[1].title}</span>*/}
                {/*    </li>*/}
                {/*    <li><input type="checkbox" checked={props.tasks[2].isDone}/>*/}
                {/*        <span>{props.tasks[2].title}</span>*/}
                {/*    </li>*/}
                </ul>
                <div>
                    <button onClick = { () => {props.setFilter('all')}}>All</button>
                    <button onClick = { () => {props.setFilter('active')}}>Active</button>
                    <button onClick = { () => {props.setFilter('completed')}}>Completed</button>
                </div>
            </h3>
        </div>
    )
}