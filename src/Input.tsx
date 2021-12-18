import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type InputPropsType = {
callBack: (title: string) => void

}

export const Input = (props:InputPropsType) => {

    const [error, setError] = useState<null | string>(null)
    const [newTaskTitle, setNewTaskTitle] = useState('')


    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>
    ) => {
        setError(null)
        if (e.key === "Enter" && newTaskTitle.trim() !== "") {
            props.callBack(newTaskTitle);
            setNewTaskTitle('')
        }
    }

    const onClickHandler = () => {
        if (newTaskTitle.trim() !== "") {
            props.callBack(newTaskTitle.trim());
            setNewTaskTitle('')
        } else {
            setError("Title ts required")
            return
        }
    }

    const inputTask = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    return (
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
    )
}