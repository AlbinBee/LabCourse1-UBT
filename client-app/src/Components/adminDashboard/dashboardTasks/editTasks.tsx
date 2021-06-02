import React, { Component } from 'react'
import { IMyTask } from '../../../app/models/myTask'

interface IProps {
    task: IMyTask;
}

const EditTasks: React.FC<IProps> = ({ task }) => {
    return(
        <div>
            <h1>Hello {task.id}</h1>
            <h1>{task.title}</h1>
            <h1>{task.category}</h1>
            <h1>{task.priority}</h1>
        </div>
    )
}
export default EditTasks
