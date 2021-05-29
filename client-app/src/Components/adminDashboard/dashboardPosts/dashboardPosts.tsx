import React, { useState, useEffect } from 'react'
import axios from 'axios'
import agent from '../../../app/api/agent';
import { IEvent } from '../../../app/models/event';
import LoadingComponent from '../../../app/layout/LoadingComponent';

const DashboardPosts = () => {
    const [events, setEvents] = useState<IEvent[]>([]);
    const [totalPosts, setTotalPosts] = useState(0);
    const [loading, setLoading] = useState(true)

//REFACTOR CODE LATER!!!!!
    useEffect(() => {
        let count = 0;
        agent.Events.list()
            .then(response => {
                // console.log(response);
                let events: IEvent[] = [];
                response.forEach((event) => {
                    count++;
                    event.dateCreated = event.dateCreated.split('.')[0]
                    event.dateOfEvent = event.dateOfEvent.split('.')[0]
                    events.push(event);
                })
                setEvents(events)
                setTotalPosts(count);
            }).then(() => setLoading(false));
    }, []);
    if (loading) {
        return <LoadingComponent content='Loading...' />
    }

    return (
        <div >
            <h1>DashboardPosts</h1>
            <h1>Total number of posts is: <span id="totalPosts">{totalPosts}</span></h1>
            {events.map((event) => (
                <div>
                    <h1>{event.title}</h1>
                    <h5>{event.description}</h5>
                    <span><h6>{event.dateCreated}</h6></span>
                    
                </div>
            ))}
        </div>
    )
}

export default DashboardPosts