import React, { useState, useEffect } from 'react'
import axios from 'axios'
import agent from '../../../app/api/agent';
import { IEvent } from '../../../app/models/event';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import DashboardTopbar from '../dashboardTopbar/dashboardTopbar';
import './style.css';
import InfoCard from '../../infoCard/infoCard';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'mainImage', headerName: 'Image', width: 130   },
    { field: 'title', headerName: 'Title', width: 130 },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'dateCreated', headerName: 'Date Created', width: 160 },
    { field: 'isBookable', headerName: 'Bookable', width: 130, type: 'boolean' },
    { field: 'hasTickets', headerName: 'Tickets', width: 130, type: 'boolean' },
    { field: 'views', headerName: 'Views', width: 110 },
    { field: 'status', headerName: 'Status', width: 130 },
];

const DashboardPosts = () => {
    const [events, setEvents] = useState<IEvent[]>([]);
    const [totalPosts, setTotalPosts] = useState(0);
    const [totalPostsVerified, setTotalPostsVerified] = useState(0);
    const [totalPostsPending, setTotalPostsPending] = useState(0);
    const [totalPostsRejected, setTotalPostsRejected] = useState(0);
    const [loading, setLoading] = useState(true);

    //REFACTOR CODE LATER!!!!!
    useEffect(() => {
        let count = 0;
        let countVerified = 0;
        let countPending = 0;
        let countRejected = 0;
        agent.Events.list()
            .then(response => {
                // console.log(response);
                let events: IEvent[] = [];
                response.forEach((event) => {
                    count++;
                    event.dateCreated = event.dateCreated.split('.')[0]
                    event.dateOfEvent = event.dateOfEvent.split('.')[0]
                    events.push(event);
                    if (event.status == 'verified') {
                        countVerified++;
                    } else if (event.status == 'pending') {
                        countPending++;
                    } else if (event.status == 'rejected') {
                        countRejected++;
                    }
                })
                setEvents(events)
                setTotalPosts(count);
                setTotalPostsVerified(countVerified);
                setTotalPostsPending(countPending);
                setTotalPostsRejected(countRejected);
            }).then(() => setLoading(false));
    }, []);
    if (loading) {
        return <LoadingComponent content='Loading...' />
    }

    return (
        <div >
            <div>
                <DashboardTopbar title="Posts" />
            </div>
            <div className="dashboardPostsContent">
                <InfoCard title="Total Posts" value={totalPosts} />
                <InfoCard title="Verified" value={totalPostsVerified} />
                <InfoCard title="Pending" value={totalPostsPending} />
                <InfoCard title="Rejected" value={totalPostsRejected} />
            </div>
            <div className="dashboardPostsStats">
                <div className="PostsChart"><h1>Chart</h1></div>
                <div className="PostsTasks"><h1>Task</h1></div>
            </div>
            <div className="dashboardPostsTable">
                <div className="PostsTableTopbar">
                    <h6 className="postsTopBarCategory">Category: </h6>
                    <span>All</span>
                </div>
                <div className="PostsTable">
                    <div style={{ width: '95%' }}>
                        <DataGrid rows={events} columns={columns} pageSize={4} checkboxSelection autoHeight/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardPosts