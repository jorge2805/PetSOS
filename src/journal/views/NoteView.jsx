import { useEffect, useMemo } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useForm } from "../../hooks";
import { ImageGallery } from "../components";
import { setActiveNote, startDeletingNote, startSavingNote, startUploadingFiles } from "../../store/journal";

import { AddAPhoto, DeleteOutline, SaveOutlined } from "@mui/icons-material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";




export const NoteView = () => {
    
    const dispatch =  useDispatch();
    const fileInputRef = useRef();

    const {active: activeNote, messageSaved, isSaving} = useSelector(state => state.journal)
  
    const {id, title, body, date, imageUrls, onInputChange, formState} = useForm(activeNote);

    const dateString = useMemo(() => {
        return new Date(date).toUTCString();
    }, [date])

    useEffect(() => {
        dispatch(setActiveNote(formState));    
    }, [formState])

    useEffect(() => {
        if( messageSaved.length > 0 ) {
            Swal.fire('Guardada Exitosamente', messageSaved ,'success');    
        }
    }, [messageSaved])
    
    const saveNote = () => {
        dispatch(startSavingNote());
    };

    const onFileInputChange = ({target}) => {
        if( target.files === 0 ) return;
        dispatch( startUploadingFiles(target.files) )
    }

    const onDeleteNote = () => {
        dispatch(startDeletingNote());
    }

    return (
        <Grid 
            container
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            sx={{mb: 1}}
        >
            <Grid item>
                <Typography fontSize={39} fontWeight='light'>{dateString}</Typography>
            </Grid>
            <Grid item>
                <input
                    type='file'
                    multiple
                    ref={fileInputRef}
                    onChange={onFileInputChange}
                    style={{display: 'none'}}
                /> 
                <IconButton
                    color="primary"
                    disabled={ isSaving }
                    onClick = { () => fileInputRef.current.click()}
                >
                    <AddAPhoto/>
                </IconButton>
                <Button
                    disabled={isSaving}
                    onClick={ saveNote } 
                    color="primary" 
                    sx={{ padding: 2}}                 >
                    <SaveOutlined sx={{fontSize: 30, mr: 1}}/>
                    Save
                </Button>
            </Grid>
            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Insert Tittle"
                    label="Nombre"
                    sx={{ border: 'none', mb: 1}}
                    name="title"
                    value={ title }
                    onChange={onInputChange}
                />
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="Describe mejor a tu mascota"
                    minRows={5}
                    sx={{ border: 'none', mb: 1}}
                    name="body"
                    value={ body  }
                    onChange={onInputChange}
                />
            </Grid>

            <Grid container justifyContent='end'>
                <Button
                    onClick={onDeleteNote}
                    sx={{mt:2}}
                    color="error"
                >
                    <DeleteOutline/>
                    Delete
                </Button>
            </Grid>
            <ImageGallery images = {activeNote.imageUrls}/>
        </Grid>
    )
}
