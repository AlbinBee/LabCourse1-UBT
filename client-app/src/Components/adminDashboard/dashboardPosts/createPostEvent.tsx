import React, { FormEvent, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { MainButton } from '../../buttons/mainButton';
import './style.css'
import { IEvent } from '../../../app/models/event';
import { v4 as uuid } from 'uuid';
import agent from '../../../app/api/agent';
import { toast } from 'react-toastify';
import { ICategory } from '../../../app/models/category';
import mainStates from '../../../app/state/mainStates';
import { history } from '../../..';


interface IProps {
    events: IEvent[];
    categories: ICategory[];
}

const CreatePostEvent: React.FC<IProps> = (props) => {
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
    const category = ([...props.categories.filter(a => a.id === 3)][0]);
    const [bookable, setBookable] = useState(true)
    const [tickets, setTickets] = useState(true);
    const [currentTickets, setCurrentTickets] = useState(0);
    const [post, setPost] = useState<IEvent>({
        id: '',
        title: '',
        description: '',
        categoryId: 3,
        category: category,
        dateCreated: currDateFormatted,
        dateOfEvent: '',
        city: '',
        mainImage: 'ImagePath',
        galleryImages: [],
        isBookable: bookable,
        hasTickets: tickets,
        availableTickets: currentTickets,
        views: 0,
        extra1: '',
        extra2: '',
        extra3: '',
        extra4: '',
        status: 'pending',
        author: currentUser
    });
    const handleInputEvChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setPost({ ...post, [name]: value });
    }
    const handleBookableChange = (event: any) => {
        setBookable(!bookable);
        setPost({ ...post, isBookable: !bookable });
    }
    const handleTicketsChange = (event: any) => {
        setTickets(!tickets);
        setPost({ ...post, hasTickets: !tickets });
    }
    const handleCurrentTicketsChange = (event: any) => {
        setCurrentTickets(event.target.value);
        setPost({ ...post, availableTickets: Number(event.target.value) });
    }
    const handleCreateEvent = (post: IEvent) => {
        try {
            agent.Events.create(post).then(() => {
                toast.success('Successfully created post!');
                setEvents([...events, post]);
                setTimeout(function () {
                    history.push('/dashboard/posts');
                    window.location.reload();
                }, 500);
            })
        } catch (e) {
            toast.error('Could not create post!');
            console.error(e);
        }
    }
    const handleSubmit = (e: any) => {
        e.preventDefault();
        let newEvent = {
            ...post,
            availableTickets: Number(currentTickets),
            id: uuid()
        }
        handleCreateEvent(newEvent);
        // console.log(newEvent);
    }
    return (
        <div>
            <form onSubmit={handleSubmit} action='/dashboard/posts'>
                <div className='editingFields'>
                    <div className='primaryEditFields'>
                        <h2>Event Details</h2>
                        <TextField
                            onChange={handleInputEvChange}
                            required
                            id="outlined-required"
                            label="Title"
                            name="title"
                            variant="outlined"
                            className='editPrimaryInputField'
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Category"
                            name="category"
                            value={category.title !== undefined && category.title}
                            disabled
                            variant="outlined"
                            className='editPrimaryInputField'
                        />
                    </div>
                    <div className='secondaryEditFields'>
                        <h2>Event Infos</h2>
                        <TextField
                            onChange={handleInputEvChange}
                            required
                            id="datetime-local"
                            label="Date Of Event"
                            type="datetime-local"
                            name="dateOfEvent"
                            variant="outlined"
                            className='editSecondaryInputField'
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            onChange={handleInputEvChange}
                            required
                            id="outlined-required"
                            label="City"
                            name="city"
                            variant="outlined"
                            className='editSecondaryInputField'
                        />
                        <TextField
                            onChange={handleInputEvChange}
                            required
                            id="outlined-required"
                            label="Description"
                            name="description"
                            multiline
                            rows={3}
                            variant="outlined"
                            className='editPrimaryInputField'
                        />
                    </div>
                    <div className='tertiaryEditFields'>
                        <h2>Event Stats</h2>
                        <FormGroup row>
                            <FormControlLabel
                                control={<Checkbox checked={tickets} onChange={handleTicketsChange} color="primary" name="hasTickets" />}
                                label="Has Tickets"
                                name="hasTickets"
                                className='editTertiaryInputField'
                            />
                        </FormGroup>
                        {tickets
                            && <TextField
                                onChange={handleCurrentTicketsChange}
                                id="standard-number"
                                label="Tickets"
                                name="availableTickets"
                                type="number"
                                defaultValue='0'
                                // onChange={(event) =>
                                //     parseInt(event.target.value) < 0
                                //         ? (event.target.value = '0')
                                //         : event.target.value
                                // }
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                className='editTertiaryInputField'
                            />}
                        <FormControlLabel
                            control={<Checkbox checked={bookable} onChange={handleBookableChange} color="primary" name="isBookable" />}
                            label="Is Bookable"
                            name="isBookable"
                            className='editTertiaryInputField'
                        />
                    </div>
                    <div className='otherEditFields'>
                        <h2>Event Extras</h2>
                        <TextField
                            onChange={handleInputEvChange}
                            id="outlined-required"
                            label="Extra1"
                            name="extra1"
                            variant="outlined"
                            className='editOtherInputField'
                        />
                        <TextField
                            onChange={handleInputEvChange}
                            id="outlined-required"
                            label="Extra2"
                            name="extra2"
                            variant="outlined"
                            className='editOtherInputField'
                        />
                        <TextField
                            onChange={handleInputEvChange}
                            id="outlined-required"
                            label="Extra3"
                            name="extra3"
                            variant="outlined"
                            className='editOtherInputField'
                        />
                        <TextField
                            onChange={handleInputEvChange}
                            id="outlined-required"
                            label="Extra4"
                            name="extra4"
                            variant="outlined"
                            className='editOtherInputField'
                        />
                    </div>
                </div>
                <div className='submitEditBtnContainer'>
                    <button className='submitEditBtn'><MainButton title='Submit' component='a' /> </button>
                </div>
            </form>
        </div>
    )
}
export default CreatePostEvent
