import React, { useEffect, useState } from "react";
import { Button, Grid, Header, Image } from "semantic-ui-react";
import PhotoCropper from "./PhotoCropper";
import WidgetDropzone from "./WidgetDropzone";


interface Props {
    loading: boolean;
    uploadPhoto: (file: Blob) => void;
}

export default function PhotoUploadWidget({loading, uploadPhoto} : Props) {
    const [files, setFiles] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>();

    function onCrop() {
        if (cropper) {
            cropper.getCroppedCanvas().toBlob(blob => uploadPhoto(blob!));

        }
    }

    useEffect(() => {
        return () => {
            files.forEach((file: any) => { URL.revokeObjectURL(file.preview) })
        }
    },[files])

    return (
        <Grid>
            <Grid.Column width={4}>
                <Header color='teal' content="Step 1 - Add Photo" />
                <WidgetDropzone setFiles={setFiles}/>
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column width={4}>
                <Header color='teal' content="Step 2 - Resize it" />
                {files && files.length > 0 && (
                    <PhotoCropper setCropper={setCropper} photoPreview={files[0].preview}/>
                    )}
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column width={4}>
                <Header color='teal' content="Step 3 - Upload" />
                {files && files.length > 0 && 
                    <>
                        <div className='img-preview' style={{ minHeight: 200, overflow: 'hidden' }} />
                        <Button.Group>
                        <Button loading={loading } onClick={onCrop} positive icon='check'/>
                        <Button disabled={loading} onClick={() => setFiles([])} icon='close'/>
                        </Button.Group>
                        </>}
                
            </Grid.Column>
        </Grid>
        )
}