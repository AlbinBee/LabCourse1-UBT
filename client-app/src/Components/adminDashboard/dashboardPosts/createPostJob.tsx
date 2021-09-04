import React, { FormEvent, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import { MainButton } from '../../buttons/mainButton';
import './style.css'
import { IEvent } from '../../../app/models/event';
import { v4 as uuid } from 'uuid';
import agent from '../../../app/api/agent';
import { toast } from 'react-toastify';
import { ICategory } from '../../../app/models/category';
import mainStates from '../../../app/state/mainStates';

interface IProps {
    events: IEvent[];
    categories: ICategory[];
}

const CreatePostJob: React.FC<IProps> = (props) => {
    const [events, setEvents] = useState<IEvent[]>(props.events);
    const currentUser = mainStates.user;
    const currDate = new Date();
    const currYear = currDate.getFullYear();
    let currMonth: any = currDate.getMonth() + 1;
    if (currMonth < 10) {
        currMonth = '0' + currMonth.toString();
    }
    let currDay: any = currDate.getDate();
    if (currDay < 10) {
        currDay = '0' + currDay.toString();
    }
    const currHour = currDate.getHours();
    const currMinute = currDate.getMinutes();
    const currDateFormatted = currYear + '-' + currMonth + '-' + currDay + 'T' + currHour + ':' + currMinute;
    const category = ([...props.categories.filter(a => a.id === 2)][0]);
    const [post, setPost] = useState<IEvent>({
        id: '',
        title: '',
        description: '',
        categoryId: 2,
        category: category,
        dateCreated: currDateFormatted,
        dateOfEvent: '',
        city: '',
        mainImage: 'ImagePath',
        galleryImages: undefined,
        isBookable: false,
        hasTickets: false,
        availableTickets: 0,
        views: 0,
        extra1: '',
        extra2: '',
        extra3: '',
        extra4: '',
        status: 'pending',
        author: currentUser
    });
    const handleInputJbChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setPost({ ...post, [name]: value });
    }
    const handleCreateEvent = (post: IEvent) => {
        try {
            agent.Events.create(post).then(() => {
                toast.success('Successfully created post!');
                setEvents([...events, post])
            })
        } catch (e: any) {
            e.preventDefault();
            toast.error('Could not create post!');
            console.error(e);
        }
    }
    const handleSubmit = (e: any) => {
        // e.preventDefault();
        let newEvent = {
            ...post,
            id: uuid()
        }
        handleCreateEvent(newEvent);
        // console.log(newEvent)
    }
    return (
        <div>
            <form onSubmit={handleSubmit} action='/dashboard/posts'>
                <div className='editingFields'>
                    <div className='primaryEditFields'>
                        <h2>Job Details</h2>
                        <TextField
                            onChange={handleInputJbChange}
                            required
                            id="outlined-required"
                            label="Title"
                            name="title"
                            variant="outlined"
                            className='editPrimaryInputField'
                        />
                        <TextField
                            onChange={handleInputJbChange}
                            required
                            id="outlined-required"
                            label="Category"
                            name="category"
                            value={category.title}
                            disabled
                            variant="outlined"
                            className='editPrimaryInputField'
                        />
                    </div>
                    <div className='secondaryEditFields'>
                        <h2>Job Infos</h2>
                        <TextField
                            onChange={handleInputJbChange}
                            required
                            id="datetime-local"
                            label="Expiration Date"
                            type="datetime-local"
                            name="dateOfEvent"
                            variant="outlined"
                            className='editSecondaryInputField'
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            onChange={handleInputJbChange}
                            required
                            id="outlined-required"
                            label="City"
                            name="city"
                            variant="outlined"
                            className='editSecondaryInputField'
                        />
                        <TextField
                            onChange={handleInputJbChange}
                            required
                            id="outlined-required"
                            label="Description"
                            name="description"
                            multiline
                            rows={4}
                            variant="outlined"
                            className='editPrimaryInputField'
                        />
                    </div>
                    <div className='otherEditFields'>
                        <h2>Job Extras</h2>
                        <TextField
                            onChange={handleInputJbChange}
                            id="outlined-required"
                            label="Extra1"
                            name="extra1"
                            variant="outlined"
                            className='editOtherInputField'
                        />
                        <TextField
                            onChange={handleInputJbChange}
                            id="outlined-required"
                            label="Extra2"
                            name="extra2"
                            variant="outlined"
                            className='editOtherInputField'
                        />
                        <TextField
                            onChange={handleInputJbChange}
                            id="outlined-required"
                            label="Extra3"
                            name="extra3"
                            variant="outlined"
                            className='editOtherInputField'
                        />
                        <TextField
                            onChange={handleInputJbChange}
                            id="outlined-required"
                            label="Extra4"
                            name="extra4"
                            variant="outlined"
                            className='editOtherInputField'
                        />
                    </div>
                </div>
                <div className='editingFields'>
                </div>
                <div className='submitEditBtn'>
                    <button className='submitEditBtn'><MainButton title='Submit' component='a' /></button>
                </div>
            </form>
        </div>
    )
}
export default CreatePostJob
