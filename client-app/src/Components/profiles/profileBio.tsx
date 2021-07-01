import { Card, CardContent, TextField, Typography, Grid, Button } from '@material-ui/core'
import React, { FormEvent, useState } from 'react'
import { Fragment } from 'react'
import { toast } from 'react-toastify'
import agent from '../../app/api/agent'
import { IProfile } from '../../app/models/profile'
import { IUser } from '../../app/models/user'
import { MainButton } from '../buttons/mainButton'

interface IProps {
    isCurrentUser: boolean,
    user: IUser,
    profile: IProfile
}

export const ProfileBio: React.FC<IProps> = ({ isCurrentUser, user, profile }) => {
    const [editMode, setEditMode] = useState(false);
    const [newProfile, setNewProfile] = useState<IProfile | null>();
    const [hasDisplayNameError, setHasDisplayNameError] = useState(false);

    const handleInputProfileChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setNewProfile({ ...profile, [name]: value });
    }

    const handleProfileSubmit = () => {
        if (newProfile?.displayName === "") {
            setHasDisplayNameError(true);
            toast.error('Your display name cannot be empty!')
        } else if (newProfile === undefined || newProfile === null) {
            setHasDisplayNameError(false);
            toast.error('You have to change at least something!')
        } else {
            setHasDisplayNameError(false);
            updateProfile(newProfile).catch(error => (
                toast.error('There was a problem updating changes!')
            ));
        }
    }

    const updateProfile = async (profile: Partial<IProfile>) => {
        try {
            await agent.Profiles.updateProfile(profile);
            toast.success('Profile updated successfully!')
            if (profile.displayName !== user.displayName) {
                user!.displayName = profile.displayName!;
            }
            console.log(newProfile)
            setNewProfile({ ...newProfile!, ...profile });
            window.location.reload();
            setEditMode(false);
        } catch (error) {
            toast.error('Problem updating profile!')
        }
    }

    return (
        <Card className='profileBioCard'>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs>
                        <Typography gutterBottom variant="h5" component="h2">
                            About {profile!.displayName}
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
                                    color="primary">
                                    Edit Profile
                                </Button>
                            }
                        </Grid>
                    }
                </Grid>
                <Typography variant="body2" color="textSecondary" component="p">
                    {editMode ?
                        <Fragment>
                            <TextField
                                error={hasDisplayNameError}
                                onChange={handleInputProfileChange}
                                required
                                id="outlined-required"
                                label="Display Name"
                                name="displayName"
                                variant="outlined"
                                className='editPrimaryInputField'
                                fullWidth
                                defaultValue={profile!.displayName}
                            />
                            <TextField
                                onChange={handleInputProfileChange}
                                id="outlined-required"
                                label="Bio"
                                name="bio"
                                multiline
                                rows={3}
                                variant="outlined"
                                className='editPrimaryInputField'
                                fullWidth
                                defaultValue={profile!.bio}
                            />
                            <button className='submitEditBtn' onClick={handleProfileSubmit}>
                                <MainButton title='Submit' component='a' />
                            </button>
                        </Fragment>
                        : (
                            <Fragment>
                                <Typography gutterBottom variant="h6" component="h5" style={{ marginTop: '10px' }}>
                                    Username: <strong>{profile!.displayName}</strong>
                                </Typography>
                                <br />
                                <Typography gutterBottom variant="h6" component="h5">
                                    Bio: <strong>{profile!.bio}</strong>
                                </Typography>
                            </Fragment>
                        )}
                </Typography>
            </CardContent>
        </Card>
    )
}
export default ProfileBio