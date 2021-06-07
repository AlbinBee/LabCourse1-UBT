import React, { useState } from 'react'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { FormControl } from '@material-ui/core';

import './style.css'
import CreatePostJob from './createPostJob';
import CreatePostEvent from './createPostEvent';
import CreatePostBooking from './createPostBooking';
import { IEvent } from '../../../app/models/event';

interface IProps {
    events: IEvent[];
}

const CreatePosts: React.FC<IProps> = (props) => {
    const [events] = useState(props.events)
    const [postCategory, setPostCategory] = useState('');

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPostCategory((event.target as HTMLInputElement).value);
    };
    return (
        <div>
            <div className="editingTopbar">
                <h1>Creating Post</h1>
            </div>
            <div className='chooseCategory'>
                <FormControl component="fieldset">
                    <h2>Choose the Category:</h2>
                    <RadioGroup row name="categoryRadioBtn" value={postCategory} onChange={handleRadioChange}>
                        <FormControlLabel value="jobs" control={<Radio />} label="Jobs" className='categoryRadioButton' />
                        <FormControlLabel value="events" control={<Radio />} label="Events" className='categoryRadioButton' />
                        <FormControlLabel value="bookings" control={<Radio />} label="Bookings" className='categoryRadioButton' />
                    </RadioGroup>
                </FormControl>
            </div>
            {postCategory === 'jobs'
                ? <CreatePostJob events={events} />
                : postCategory === 'events'
                    ? <CreatePostEvent events={events} />
                    : postCategory === 'bookings'
                        ? <CreatePostBooking events={events} />
                        : postCategory === 'bookings'
            }
        </div>
    )
}
export default CreatePosts
