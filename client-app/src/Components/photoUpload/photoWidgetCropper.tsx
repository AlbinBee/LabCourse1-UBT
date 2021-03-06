import React, { useRef } from 'react'
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css"; // see installation section above for versions of NPM older than 3.0.0

interface IProps {
    setImage: (file: Blob) => void;
    imagePreview: string;

}

export const PhotoWidgetCropper: React.FC<IProps> = ({ setImage, imagePreview }) => {
    const cropper = useRef<Cropper>(null);

    const cropImage = () => {
        if (cropper.current && typeof cropper.current.getCroppedCanvas() === 'undefined') {
            return;
        }
        cropper && cropper.current && cropper.current.getCroppedCanvas().toBlob((blob: any) => {
            setImage(blob)
        }, 'image/jpeg');
    };

    return (
        <div>
            <h5>Not Working</h5>
            {/* <Cropper
                ref={cropper}
                src={imagePreview}
                style={{ height: 200, width: '100%' }}
                // Cropper.js options
                aspectRatio={1 / 1}
                preview='.img-preview'
                guides={false}
                viewMode={1}
                dragMode='move'
                scalable={true}
                cropBoxMovable={true}
                cropBoxResizable={true}
                crop={clgClick}
            /> */}
        </div>

    );
}
export default PhotoWidgetCropper