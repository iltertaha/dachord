import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Header, Icon } from 'semantic-ui-react'


interface Props {
    setFiles: (files: any) => void;
}

export default function WidgetDropzone({ setFiles }: Props) {
    const dropzoneStyle = {
        border: 'dashed 3px #eee',
        borderColor: '#eee',
        borderRadius: '5px',
        paddingTop: '30px',
        textAlign: 'center' as 'center',
        height: 200
    }

    const dropzonActive = {
        borderColor:'green'
    }

    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles.map((file: any) => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })))
        
    }, [setFiles])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
        
    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} style={isDragActive ? { ...dropzoneStyle, ...dropzonActive } : dropzoneStyle} />
            <Icon name="upload" size="huge" />
            <Header  conent='Drop photo here'/>
        </div>
    )
}