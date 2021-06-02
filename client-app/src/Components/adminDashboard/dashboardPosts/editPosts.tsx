import React, { Component } from 'react'
import { IEvent } from '../../../app/models/event'

interface IProps {
    event: IEvent;
}

const EditPosts: React.FC<IProps> = ({ event }) => {
    return(
        <div>
            <h1>Hello {event.id}</h1>
            <h1>{event.title}</h1>
            <h1>{event.category}</h1>
            <h1>{event.dateCreated}</h1>
        </div>
    )
}
export default EditPosts
