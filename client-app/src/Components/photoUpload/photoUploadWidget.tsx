import { Typography, Grid, Button, ButtonGroup } from '@material-ui/core';
import React, { Fragment, useEffect, useState } from 'react';
import { IProfile } from '../../app/models/profile';
import PhotoWidgetDropzone from './photoWidgetDropzone';

interface IProps {
    profile: IProfile;
    isCurrentUser: boolean;
    loading: boolean;
    uploadPhoto: (file: Blob) => void;
}

const PhotoUploadWidget: React.FC<IProps> = ({ uploadPhoto }) => {
    const [files, setFiles] = useState<any[]>([]);

    useEffect(() => {
        return () => {
            files.forEach(file => URL.revokeObjectURL(file.preview));
        }
    }, [])
    return (
        <Grid container spacing={2}>
            <Grid item xs>
                <Typography gutterBottom variant="h6" component="h6" className='labelForUploadSteps'>
                    Step 1: Upload Image
                </Typography>
                <PhotoWidgetDropzone setFiles={setFiles} />
            </Grid>
            <Grid item xs>
                <Typography gutterBottom variant="h6" component="h6" className='labelForUploadSteps'>
                    Step 2: Preview & Upload
                </Typography>
                {files.length > 0 &&
                    <Fragment>
                        <img src={files[0].preview} className='profileUploadPhoto' />
                        <ButtonGroup className='profileUserPhotosButtons'>
                            <Button
                                className='profileUserPhotosButton'
                                onClick={() => uploadPhoto(files[0])}
                                variant="contained"
                                color="primary"
                            >
                                Add
                            </Button>
                            <Button
                                className='profileUserPhotosButton'
                                onClick={() => setFiles([])}
                                variant="outlined"
                                color="secondary"
                            >
                                Cancel
                            </Button>
                        </ButtonGroup>
                    </Fragment>
                }
            </Grid>
        </Grid>
    );
}

export default PhotoUploadWidget;
