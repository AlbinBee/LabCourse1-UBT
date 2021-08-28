import { CardContent, Typography, Card, Button, Grid, ButtonGroup, Paper } from '@material-ui/core';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import agent from '../../app/api/agent';
import { IPhoto, IProfile } from '../../app/models/profile'
import { IUser } from '../../app/models/user';
import PhotoUploadWidget from '../photoUpload/photoUploadWidget';

interface IProps {
    profile: IProfile;
    isCurrentUser: boolean;
    user: IUser;

}
const ProfilePhotos: React.FC<IProps> = ({ profile, isCurrentUser, user }) => {
    const [addPhotoMode, setAddPhotoMode] = useState(false);
    const [uploadingPhoto, setUploadingPhoto] = useState(false);
    const [loading, setLoading] = useState(false);
    const [target, setTarget] = useState<string | undefined>(undefined)
    const [deleteTarget, setDeleteTarget] = useState<string | undefined>(undefined)
    const [newUserImg, setNewUserImg] = useState<IUser | null>(user);

    const handleUploadImage = (photo: Blob) => {
        uploadPhoto(photo).then(() => setAddPhotoMode(false));
    }

    const uploadPhoto = async (file: Blob) => {
        setUploadingPhoto(true);
        try {
            const photo = await agent.Profiles.uploadPhoto(file);
            if (profile) {
                profile.photos.push(photo);
                if (photo.isMain && user) {
                    user.image = photo.url;
                    profile.image = photo.url;
                }
            }
            toast.success('Photo uploaded successfully!');
            setUploadingPhoto(false);

        } catch (error) {
            console.log(error);
            toast.error('Problem uploading photo');
            setUploadingPhoto(false);
        }
    }

    const setMainPhoto = async (photo: IPhoto) => {
        setLoading(true);
        try {
            setNewUserImg({ ...user, image: photo.url });
            await agent.Profiles.setMainPhoto(photo.id);
            user!.image = photo.url;
            profile!.photos.find(a => a.isMain)!.isMain = false;
            profile!.photos.find(a => a.id === photo.id)!.isMain = true;
            profile!.image = photo.url;
            sessionStorage.setItem('user', JSON.stringify(newUserImg));
            toast.success('Photo changed successfully!');
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
            await agent.Profiles.deletePhoto(photo.id);
            profile!.photos = profile!.photos.filter(a => a.id !== photo.id);
            window.location.reload();
            toast.info('Photo deleted successfully!');
            setLoading(false);
        } catch (error) {
            toast.error('Problem deleting photo!');
            setLoading(false);
            console.log(error);
        }
    }

    return (
        <Card className='profileBioCard'>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs>
                        <Typography gutterBottom variant="h5" component="h2">
                            {profile!.displayName} Photos
                        </Typography>
                    </Grid>
                    {isCurrentUser &&
                        <Grid item xs justify="flex-end" style={{ display: 'flex' }}>
                            {addPhotoMode ?
                                <Button
                                    onClick={() => setAddPhotoMode(!addPhotoMode)}
                                    variant="outlined"
                                    color="secondary"
                                >Cancel
                                </Button>
                                :
                                <Button
                                    onClick={() => setAddPhotoMode(!addPhotoMode)}
                                    variant="contained"
                                    color="primary"
                                >
                                    Add Photo
                                </Button>
                            }
                        </Grid>
                    }
                </Grid>
                <Grid container spacing={2}>
                    {addPhotoMode ? (
                        <PhotoUploadWidget profile={profile!} isCurrentUser={isCurrentUser!} uploadPhoto={handleUploadImage} loading={uploadingPhoto} />
                    ) : (
                        <div className='profileUserPhoto'>
                            {profile.photos.length > 0
                                ? profile && profile.photos.map((photo) => (
                                    <Paper key={photo.id}>
                                        <img src={photo.url} className='profileUserPhotos' />
                                        {isCurrentUser &&
                                            <ButtonGroup className='profileUserPhotosButtons'>
                                                <Button
                                                    className='profileUserPhotosButton'
                                                    color='primary'
                                                    name={photo.id}
                                                    onClick={(e) => {
                                                        setMainPhoto(photo);
                                                        setTarget(e.currentTarget.name);
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
                                                        setDeleteTarget(e.currentTarget.name);
                                                    }}
                                                    disabled={photo.isMain}
                                                >
                                                    Delete
                                                </Button>
                                            </ButtonGroup>
                                        }
                                    </Paper>
                                ))
                                : <div>No images to display</div>
                            }

                        </div>
                    )}

                </Grid>

            </CardContent>
        </Card>
    )
}

export default ProfilePhotos
