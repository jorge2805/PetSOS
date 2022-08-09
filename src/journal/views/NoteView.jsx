import { useEffect, useMemo } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Moment from 'moment';

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
        
        return Moment(date).format('ll');
        // return Moment(date).format('DD-MM-YYYY');
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
            alignItems='center'
            sx={{mb: 1}}
        >
            {/* Header */}
            <Grid container item
                sm={12} md={12}                
            >
                <Grid
                    container 
                    item
                    sm={6} md={6}                
                    justifyContent='flex-start'
                >
                    <Typography fontSize={39} fontWeight='light'>{dateString}</Typography>
                </Grid>
                <Grid 
                    container
                    item
                    sm={12} md={6}                
                    justifyContent='flex-end'
                >
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
            </Grid>

            <Grid container item
                alignContent='flex-start'
                sm={12} md={12}                
            >
                <Grid 
                    container
                    item
                    sm={12} md={6} 
                    alignContent='flex-start'   
                    sx={{
                        pr:1
                    }}            
                >
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
                <Grid 
                    container
                    item
                    sm={12} md={6}              
                >
                    <ImageGallery 
                        sm={6} md={6}                
                        images = {activeNote.imageUrls}
                    />
                </Grid>
            </Grid>

            <Grid container justifyContent='flex-end'>
                <Button
                    onClick={onDeleteNote}
                    sx={{mt:2}}
                    color="error"
                >
                    <DeleteOutline/>
                    Delete
                </Button>
            </Grid>
        </Grid>
    )
}
