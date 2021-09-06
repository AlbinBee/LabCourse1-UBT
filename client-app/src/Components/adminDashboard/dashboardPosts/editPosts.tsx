import React, { FormEvent, Fragment, useEffect, useState } from 'react'
import { IEvent } from '../../../app/models/event'
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Button, ButtonGroup, FormControl, Paper } from '@material-ui/core';
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
import { IPhoto } from '../../../app/models/profile';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import PhotoWidgetDropzone from '../../photoUpload/photoWidgetDropzone';

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
    const [category, setCategory] = useState<ICategory>();
    const classes = useStyles();
    const [currCategoryId, setCurrCategoryId] = useState<number | undefined>(event.categoryId);
    const [currStatus, setCurrStatus] = useState(event.status);
    const [bookable, setBookable] = useState(event.isBookable)
    const [tickets, setTickets] = useState(event.hasTickets);
    const [loading, setLoading] = useState(true);
    const [files, setFiles] = useState<any[]>([]);

    const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setCurrStatus(event.target.value as string);
        setPost({ ...post, status: currStatus });
    };
    const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setCurrCategoryId(event.target.value as number);
        setCategory([...categories.filter(a => a.id === event.target.value as number)][0])
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
    const uploadPhoto = async (file: Blob) => {
        try {
            const photo = await agent.Events.uploadPhoto(post.id, file);
            post!.galleryImages!.push(photo);
            setFiles([]);
            toast.success('Photo uploaded successfully!');
        } catch (error) {
            console.log(error);
            toast.error('Problem uploading photo');
        }
    }
    const setMainPhoto = async (photo: IPhoto) => {
        setLoading(true);
        try {
            await agent.Events.setMainPhoto(post.id, photo.id);
            toast.success('Photo set to main successfully!');
            setLoading(false);
            window.location.reload();
        } catch (error) {
            toast.error('Problem making photo as main');
            setLoading(false);
            console.log(error);
        }
    }
    const deletePhoto = async (photo: IPhoto) => {
        setLoading(true);
        try {
            await agent.Events.deletePhoto(photo.id, post);
            post!.galleryImages = post!.galleryImages?.filter(a => a.id !== photo.id);
            toast.info('Photo deleted successfully!');
            setLoading(false);
        } catch (error) {
            toast.error('Problem deleting photo!');
            setLoading(false);
            console.log(error);
        }
    }
    const handleDiscardChanges = () => {
        setFiles([]);
    }
    const handleSubmit = (e: any) => {
        // e.preventDefault();
        let editedPost = {
            ...post,
            status: currStatus,
            categoryId: currCategoryId,
        }
        // console.log(editedPost)
        handleEditEvent(editedPost);
    }
    useEffect(() => {
        setLoading(true);
        try {
            agent.Categories.list()
                .then(response => {
                    // console.log(response);
                    let categories: ICategory[] = [];
                    response.forEach((category) => {
                        categories.push(category);
                    })
                    setCategories(categories)
                    setCategory([...categories.filter(a => a.id === event.categoryId)][0])
                    post.category = category;
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
                            rows={5}
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
                            defaultValue={[...categories.filter(a => a.id === event.categoryId)][0].title}
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
                    <div className='primaryEditFields editingPostImages'>
                        <h2>Post Images</h2>
                        <div className='editingPostImage'>
                            {event.galleryImages!?.length > 0
                                ? <Fragment>
                                    {event && event.galleryImages!?.map((photo) => (
                                        <Paper key={photo.id} className='eventPaperImg'>
                                            <img src={photo.url} className='profileUserPhotos' />
                                            <ButtonGroup className='profileUserPhotosButtons'>
                                                <Button
                                                    className='profileUserPhotosButton'
                                                    color='primary'
                                                    name={photo.id}
                                                    onClick={(e) => {
                                                        setMainPhoto(photo);
                                                    }}
                                                    disabled={photo.isMain}
                                                >
                                                    Main
                                                </Button>
                                                <Button
                                                    className='profileUserPhotosButton'
                                                    color='secondary'
                                                    name={photo.id}
                                                    onClick={(e) => {
                                                        deletePhoto(photo);
                                                    }}
                                                    disabled={photo.isMain}
                                                >
                                                    Delete
                                                </Button>
                                            </ButtonGroup>
                                        </Paper>
                                    ))}
                                    {files.length > 0 ?
                                        <div>
                                            <img src={files[0].preview} alt="previewImage" className='eventImgPreview' />
                                            <div className='saveChangesBtnContainer saveEventChangesBtnContainer'>
                                                <Button
                                                    className='editIcon saveChangesBtn saveEventChangesBtn'
                                                    style={{ color: '#2ed47a' }}
                                                    onClick={() => uploadPhoto(files[0])}
                                                >
                                                    <CheckIcon />
                                                </Button>
                                                <Button
                                                    className='deleteIcon discardChangesBtn discardEventChangesBtn'
                                                    style={{ color: '#ff0000' }}
                                                    onClick={() => handleDiscardChanges()}
                                                >
                                                    <ClearIcon />
                                                </Button>
                                            </div>
                                        </div>
                                        : <Fragment>
                                            <div className='eventPhotoWidgetDropzone'><span className='eventPhotoWidgetSpan'>Or add image</span> <PhotoWidgetDropzone setFiles={setFiles} /></div>
                                        </Fragment>
                                    }
                                </Fragment>
                                : <Fragment>
                                    {files.length > 0 ?
                                        <Fragment>
                                            <img src={files[0].preview} alt="previewImage" className='eventImgPreview' />
                                            <div className='saveChangesBtnContainer saveEventChangesBtnContainer'>
                                                <Button
                                                    className='editIcon saveChangesBtn saveEventChangesBtn'
                                                    style={{ color: '#2ed47a' }}
                                                    onClick={() => uploadPhoto(files[0])}
                                                >
                                                    <CheckIcon />
                                                </Button>
                                                <Button
                                                    className='deleteIcon discardChangesBtn discardEventChangesBtn'
                                                    style={{ color: '#ff0000' }}
                                                    onClick={() => handleDiscardChanges()}
                                                >
                                                    <ClearIcon />
                                                </Button>
                                            </div>
                                        </Fragment>
                                        : <Fragment>
                                            <div style={{ marginBottom: '10px' }}>No images to display</div>
                                            <div className='eventPhotoWidgetDropzone'><PhotoWidgetDropzone setFiles={setFiles} /></div>
                                        </Fragment>
                                    }
                                </Fragment>
                            }
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
