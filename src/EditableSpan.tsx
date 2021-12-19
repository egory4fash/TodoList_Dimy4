import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    callBack:(newtitle:string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {

    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState('')
    const editModeOn = () => {
        setTitle(props.title)
        setEditMode(true)
    }
    const editModeOff = () => {
        setEditMode(false)
       props.callBack (title)
    }

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)}

    return (
        editMode ?
            <input value={title} onChange={onChangeHandler} onBlur={editModeOff} autoFocus/>
            :
            <span onDoubleClick={editModeOn}>
        {props.title}
    </span>
    )
}