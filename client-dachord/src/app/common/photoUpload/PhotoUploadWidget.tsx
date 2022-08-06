import React, { useEffect, useState } from "react";
import { Button, Grid, Header, Image } from "semantic-ui-react";
import PhotoCropper from "./PhotoCropper";
import WidgetDropzone from "./WidgetDropzone";


export default function PhotoUploadWidget() {
    const [files, setFiles] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>();

    function onCrop() {
        if (cropper) {
            cropper.getCroppedCanvas().toBlob(blob => console.log(blob));

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
                            <Button onClick={onCrop} positive icon='check'/>
                            <Button onClick={() => setFiles([])} icon='close'/>
                        </Button.Group>
                        </>}
                
            </Grid.Column>
        </Grid>
        )
}