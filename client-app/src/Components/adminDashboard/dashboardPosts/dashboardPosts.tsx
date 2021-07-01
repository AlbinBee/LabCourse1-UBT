import { useState, useEffect } from 'react'
import agent from '../../../app/api/agent';
import { IEvent } from '../../../app/models/event';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import DashboardTopbar from '../dashboardTopbar/dashboardTopbar';
import './style.css';
import InfoCard from '../../infoCard/infoCard';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import EditIcon from '../../assets/Icons/edit.svg';
import DeleteIcon from '../../assets/Icons/delete.svg';
import AddIcon from '../../assets/Icons/add.svg';
import { Link } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import { MainButtonIcon } from '../../buttons/mainButton';
import { toast } from 'react-toastify';

const DashboardPosts = () => {
    const [events, setEvents] = useState<IEvent[]>([]);
    const [totalPosts, setTotalPosts] = useState(0);
    const [totalPostsVerified, setTotalPostsVerified] = useState(0);
    const [totalPostsPending, setTotalPostsPending] = useState(0);
    const [totalPostsRejected, setTotalPostsRejected] = useState(0);
    const [loading, setLoading] = useState(true);

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'mainImage', headerName: 'Image', width: 130 },
        { field: 'title', headerName: 'Title', width: 130 },
        {
            field: 'category', headerName: 'Category', width: 150, renderCell: (params: any) => (
                <div>
                    <span className='categoryChip'>{params.row.category}</span>
                </div>
            )
        },

        { field: 'isBookable', headerName: 'Bookable', width: 130, type: 'boolean' },
        { field: 'hasTickets', headerName: 'Tickets', width: 130, type: 'boolean' },
        {
            field: 'chip', headerName: 'Status', width: 130, renderCell: (params: any) => (
                <div>
                    {params.row.status === 'verified'
                        ? <Chip color="primary" label={params.row.status} className='verifiedChipStatus' />
                        : params.row.status === 'pending'
                            ? <Chip color="primary" label={params.row.status} className='pendingChipStatus' />
                            : <Chip color="secondary" label={params.row.status} className='rejectedChipStatus' />
                    }
                </div>
            )
        },
        { field: 'views', headerName: 'Views', width: 110 },
        { field: 'dateCreated', headerName: 'Date Created', width: 160},
        {
            field: 'edit', headerName: 'Action', width: 130, renderCell: (params: any) => (
                <div className='actionIconsContainer'>
                    <Button className='deleteIcon' onClick={() => handleDeleteEvent(params.id)}>
                        <img src={DeleteIcon} alt="delete" className='actionIcon' />
                    </Button>
                    <Link to={`/dashboard/edit/posts/${params.id}`} className='editIconContainer'>
                        <Button className='editIcon'>
                            <img src={EditIcon} alt="edit" className='actionIcon' />
                        </Button>
                    </Link>
                </div>
            ),
        },
    ];

    const handleDeleteEvent = (id: string) => {
        try {
            agent.Events.delete(id).then(() => {
                setEvents([...events.filter(e => e.id !== id)])
                toast.success('Successfully deleted post!');
                setTotalPosts(totalPosts - 1);
            }).then(() => setLoading(false));
        } catch (error) {
            console.log(error);
            toast.error('Could not delete post!');
        }
    }

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
                    if (event.status === 'verified') {
                        countVerified++;
                    } else if (event.status === 'pending') {
                        countPending++;
                    } else if (event.status === 'rejected') {
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
        return <LoadingComponent content='Loading Posts...' />
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
                    <h6 className="postsTopBarCategory">Category: <span>All</span></h6>
                    <Link to='/dashboard/create/posts'>
                        <MainButtonIcon variant="contained" color="primary" className='createPostBtn' icon={AddIcon} title='Create Post' />
                    </Link>
                </div>
                <div className="PostsTable">
                    <div style={{ width: '95%' }}>
                        <DataGrid
                            rows={events}
                            columns={columns}
                            pageSize={10}
                            checkboxSelection
                            autoHeight />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardPosts