import React, { FormEvent, useEffect, useState } from 'react'
import { IEvent } from '../../../app/models/event'
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { FormControl } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import './style.css'
import { MainButton } from '../../buttons/mainButton';
import agent from '../../../app/api/agent';
import { toast } from 'react-toastify';
import { ICategory } from '../../../app/models/category';

interface IProps {
    event: IEvent;
    events: IEvent[];
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);

const EditPosts: React.FC<IProps> = ({ event, events }) => {
    const [post, setPost] = useState<IEvent>(event);
    const [posts, setPosts] = useState<IEvent[]>(events);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [category, setCategory] = useState<ICategory>(event.category);
    const classes = useStyles();
    const [currCategoryId, setCurrCategoryId] = useState<number | undefined>(event.categoryId);
    const [currStatus, setCurrStatus] = useState(event.status);
    const [bookable, setBookable] = useState(true)
    const [tickets, setTickets] = useState(true);
    const [loading, setLoading] = useState(true);


    const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setCurrStatus(event.target.value as string);
        setPost({ ...post, status: currStatus });
    };
    const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setCurrCategoryId(event.target.value as number);
        setCategory([...categories.filter(a => a.id == currCategoryId)][0])
        setPost({ ...post, category: category });
    };

    const handleBookableChange = (event: any) => {
        setBookable(!bookable);
        setPost({ ...post, isBookable: !bookable });
    }
    const handleTicketsChange = (event: any) => {
        setTickets(!tickets);
        setPost({ ...post, hasTickets: !tickets });
    }
    const handleCurrentNumberChange = (event: any) => {
        const { name, value } = event.currentTarget;
        setPost({ ...post, [name]: Number(value) });
    }
    const handleInputEditChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setPost({ ...post, [name]: value });
    }
    const handleEditEvent = (post: IEvent) => {
        try {
            agent.Events.update(post).then(() => {
                setPosts([...events.filter(a => a.id !== post.id), post])
                toast.success('Successfully edited post!');
            })
        } catch (e) {
            toast.error('Could not edit post!');
            console.error(e);
        }
    }
    const handleSubmit = (e: any) => {
        // e.preventDefault();
        let editedPost = {
            ...post,
            status: currStatus,
            categoryId: currCategoryId,
            category: [...categories.filter(a => a.id == currCategoryId)][0]
        }
        handleEditEvent(editedPost);
    }
    useEffect(() => {
        try {
            agent.Categories.list()
                .then(response => {
                    // console.log(response);
                    let categories: ICategory[] = [];
                    response.forEach((category) => {
                        categories.push(category);
                    })
                    setCategories(categories)
                    setLoading(false)
                });
        } catch (error) {
            toast.error('Error happened, check terminal');
            console.log(error)
        }
    }, [])
    if (loading) return <LoadingComponent content='Loading...' />

    return (
        <div>
            <form onSubmit={handleSubmit} action='/dashboard/posts'>
                <div className="editingTopbar">
                    <h1>Editing Post: {event.title}</h1>
                </div>
                <div className='editingFields'>
                    <div className='primaryEditFields'>
                        <h2>Post Details</h2>
                        <TextField
                            onChange={handleInputEditChange}
                            required
                            id="outlined-required"
                            label="Title"
                            name="title"
                            defaultValue={event.title}
                            variant="outlined"
                            className='editPrimaryInputField'
                        />
                        <TextField
                            onChange={handleInputEditChange}
                            required
                            id="outlined-required"
                            label="Description"
                            name="description"
                            multiline
                            rows={3}
                            defaultValue={event.description}
                            variant="outlined"
                            className='editPrimaryInputField'
                        />
                        <div className='primaryEditFields'>
                            <FormControl className={classes.formControl} >
                                <InputLabel id="demo-simple-select-autowidth-label">Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-autowidth-label"
                                    id="demo-simple-select-autowidth"
                                    name="categoryId"
                                    value={currCategoryId}
                                    onChange={handleCategoryChange}
                                    autoWidth
                                    className='editInputField'
                                >
                                    {categories.map((category) => (
                                        <MenuItem
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.title}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <TextField
                            onChange={handleInputEditChange}
                            required
                            id="outlined-required"
                            label="Current Category"
                            name="category"
                            disabled
                            defaultValue={[...categories.filter(a => a.id == event.categoryId)][0].title}
                            variant="outlined"
                            className='editPrimaryInputField'
                        />
                    </div>
                    <div className='secondaryEditFields'>
                        <h2>Post Infos</h2>
                        <TextField
                            onChange={handleInputEditChange}
                            id="datetime-local"
                            label="Date Of Event"
                            type="datetime-local"
                            name="dateOfEvent"
                            variant="outlined"
                            defaultValue={event.dateOfEvent}
                            className='editSecondaryInputField'
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            onChange={handleInputEditChange}
                            required
                            id="outlined-required"
                            label="City"
                            name="city"
                            defaultValue={event.city}
                            variant="outlined"
                            className='editSecondaryInputField'
                        />
                        <div className='editInputField'>
                            <FormControl className={classes.formControl} >
                                <InputLabel id="demo-simple-select-autowidth-label">Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-autowidth-label"
                                    id="demo-simple-select-autowidth"
                                    name={currStatus}
                                    value={currStatus}
                                    onChange={handleSelectChange}
                                    autoWidth
                                    className='editInputField'
                                >
                                    <MenuItem value={'verified'}>verified</MenuItem>
                                    <MenuItem value={'pending'}>pending</MenuItem>
                                    <MenuItem value={'rejected'}>rejected</MenuItem>
                                </Select>
                                <FormHelperText>Current status: <b>{event.status}</b></FormHelperText>
                            </FormControl>
                        </div>
                    </div>
                </div>
                <div className='editingFields'>
                    <div className='tertiaryEditFields'>
                        <h2>Post Stats</h2>
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
                                onChange={handleCurrentNumberChange}
                                id="standard-number"
                                label="Tickets"
                                name="availableTickets"
                                type="number"
                                defaultValue={event.availableTickets}
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
                        <TextField
                            onChange={handleCurrentNumberChange}
                            required
                            id="outlined-required"
                            label="Views"
                            name="views"
                            type="number"
                            defaultValue={event.views}
                            // onChange={(event) =>
                            //     parseInt(event.target.value) < 0
                            //         ? (event.target.value = '0')
                            //         : event.target.value
                            // }
                            variant="outlined"
                            className='editTertiaryInputField'
                        />
                    </div>
                    <div className='otherEditFields'>
                        <h2>Post Extras</h2>
                        <TextField
                            onChange={handleInputEditChange}
                            id="outlined-required"
                            label="Extra1"
                            name="extra1"
                            defaultValue={event.extra1}
                            variant="outlined"
                            className='editOtherInputField'
                        />
                        <TextField
                            onChange={handleInputEditChange}
                            id="outlined-required"
                            label="Extra2"
                            name="extra2"
                            defaultValue={event.extra2}
                            variant="outlined"
                            className='editOtherInputField'
                        />
                        <TextField
                            onChange={handleInputEditChange}
                            id="outlined-required"
                            label="Extra3"
                            name="extra3"
                            defaultValue={event.extra3}
                            variant="outlined"
                            className='editOtherInputField'
                        />
                        <TextField
                            onChange={handleInputEditChange}
                            id="outlined-required"
                            label="Extra4"
                            name="extra4"
                            defaultValue={event.extra4}
                            variant="outlined"
                            className='editOtherInputField'
                        />
                    </div>
                </div>
                <div className='submitEditBtn'>
                    <button className='submitEditBtn'><MainButton title='Submit' component='a' /></button>
                </div>
            </form>
        </div>
    )
}
export default EditPosts
