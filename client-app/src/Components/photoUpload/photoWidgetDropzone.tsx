import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@material-ui/core'
import PublishIcon from '@material-ui/icons/Publish';

interface IProps {
    setFiles: (files: object[]) => void;
}

const dropzoneStyles = {
    border: 'dashed 3px',
    borderColor: '#eee',
    borderRadius: '5px',
    paddingTop: '30px',
    textAlign: 'center' as 'center',
    height: '200px'
}
const dropzoneActive = {
    borderColor: 'green'
}

const PhotoWidgetDropzone: React.FC<IProps> = ({ setFiles }) => {
    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles.map((file: object) => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
        // console.log(acceptedFiles);
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()} style={
            isDragActive ? { ...dropzoneStyles, ...dropzoneActive }
                : dropzoneStyles
        }>
            <input {...getInputProps()} />
            <Button size='large' style={{ width: '100%' }}>
                <PublishIcon fontSize='large' />
            </Button>
            <h4>Drop image here</h4>
        </div>
    )
}

export default PhotoWidgetDropzone