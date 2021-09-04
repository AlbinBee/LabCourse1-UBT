import { Button, ButtonGroup, Card, CardContent, Grid, Paper, Typography } from '@material-ui/core';
import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { IEvent } from '../../app/models/event';
import { IProfile } from '../../app/models/profile';
import { IUser } from '../../app/models/user';
import noImg from '../assets/ads/noImg.png';
import { MainButton } from '../buttons/mainButton';

interface IProps {
    profile: IProfile;
    isCurrentUser: boolean;
    user: IUser;
    events: IEvent[]

}

const ProfileEvents: React.FC<IProps> = ({ profile, isCurrentUser, user, events }) => {
    const [editMode, setEditMode] = useState(false);

    return (
        <Card className='profileBioCard'>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs>
                        <Typography gutterBottom variant="h5" component="h2">
                            {profile!.displayName} Events
                        </Typography>
                    </Grid>
                    {isCurrentUser &&
                        <Grid item xs justify="flex-end" style={{ display: 'flex' }}>
                            {editMode ?
                                <Button
                                    onClick={() => setEditMode(!editMode)}
                                    variant="outlined"
                                    color="secondary"
                                >Cancel
                                </Button>
                                :
                                <Button
                                    onClick={() => setEditMode(!editMode)}
                                    variant="contained"
                                    color="primary"
                                >
                                    Add Event
                                </Button>
                            }
                        </Grid>
                    }
                </Grid>
                <Grid container spacing={2} className='profileEventsContainer'>
                    {events.map((event) => (
                        event.author.displayName == profile.displayName &&
                        <Paper key={event.id} className='profileEventCard'>
                            <img src={event.galleryImages!?.length > 0 ? event.galleryImages![0].url : noImg} className='profileUserPhotos' />
                            <h3 className='profileEventTitle'>{event.title}</h3>
                            <p className='profileEventDesc'>{event.description}</p>
                            <div className='seeMoreProfileEvent'>
                                <Link to={`/events/${event.id}`}>
                                    <MainButton title='See More' />
                                </Link>
                            </div>
                        </Paper>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    )
}

export default ProfileEvents
