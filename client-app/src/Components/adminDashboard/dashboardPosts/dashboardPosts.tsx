import { useState, useEffect, Fragment } from 'react'
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
import { ICategory } from '../../../app/models/category';
import { AvatarGroup } from '@material-ui/lab';
import { PhotoCamera } from '@material-ui/icons';

const DashboardPosts = () => {
    const [events, setEvents] = useState<IEvent[]>([]);
    const [totalPosts, setTotalPosts] = useState(0);
    const [totalPostsVerified, setTotalPostsVerified] = useState(0);
    const [totalPostsPending, setTotalPostsPending] = useState(0);
    const [totalPostsRejected, setTotalPostsRejected] = useState(0);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState<ICategory[]>([]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        {
            field: 'galleryImages', headerName: 'Images', width: 150, renderCell: (params: any) => (
                <div>
                    {
                        (params.row.galleryImages?.length > 0) ?
                            <AvatarGroup max={3}>
                                {params.row.galleryImages.map((photo: any) => (
                                    <img src={photo.url} alt="image" className='userImagesDashboard' />
                                ))}
                            </AvatarGroup>
                            : <Fragment>
                                <Link to={`/dashboard/posts/edit/${params.id}`}>
                                    <Button color="primary" aria-label="upload picture" component="span">
                                        <PhotoCamera />
                                        Add Image
                                    </Button>
                                </Link>
                            </Fragment>
                    }
                </div>
            )
        },
        { field: 'title', headerName: 'Title', width: 130 },
        {
            field: 'categoryId', headerName: 'Category', width: 150, renderCell: (params: any) => (
                <div>
                    <span className='categoryChip'>{[...categories.filter(a => a.id === params.row.categoryId)][0].title}</span>
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
        { field: 'dateCreated', headerName: 'Date Created', width: 160 },
        {
            field: 'edit', headerName: 'Action', width: 160, renderCell: (params: any) => (
                <div className='actionIconsContainer'>
                    <Button className='deleteIcon' onClick={() => handleDeleteEvent(params.id)}>
                        <img src={DeleteIcon} alt="delete" className='actionIcon' />
                    </Button>
                    <Button component={Link} to={`/dashboard/posts/edit/${params.id}`} className='editIcon editIconContainer'>
                        <img src={EditIcon} alt="edit" className='actionIcon' />
                    </Button>
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
        setLoading(true);
        let count = 0;
        let countVerified = 0;
        let countPending = 0;
        let countRejected = 0;
        agent.Categories.list()
            .then(response => {
                // console.log(response);
                let categories: ICategory[] = [];
                response.forEach((category) => {
                    categories.push(category);
                })
                setCategories(categories)
            });
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
                    <Link to='/dashboard/posts/create'>
                        <MainButtonIcon
                            variant="contained"
                            color="primary"
                            className='createPostBtn'
                            icon={AddIcon}
                            title='Create Post'
                        />
                    </Link>
                </div>
                <div className="PostsTable">
                    <div style={{ width: '95%' }}>
                        <DataGrid
                            rows={events}
                            columns={columns}
                            pageSize={7}
                            checkboxSelection
                            autoHeight
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardPosts