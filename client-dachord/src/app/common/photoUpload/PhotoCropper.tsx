import React from "react";
import 'cropperjs/dist/cropper.css';
import { Cropper } from "react-cropper";


interface Props {
    photoPreview: string;
    setCropper: (cropper: Cropper) => void;
}

export default function PhotoCropper({ photoPreview, setCropper } : Props) {
    return (
        <Cropper
            src={photoPreview}
            style={{ height: 200, width: "100%" }}
            initialAspectRatio={1}
            aspectRatio={1}
            preview='.img-preview'
            guides={false}
            viewMode={1}
            autoCropArea={1}
            background={false}
            onInitialized={cropper => setCropper(cropper)}

        />

        )
}