import { useEffect, useMemo } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import 'moment/dist/locale/es-do';
moment.locale('es-do')



import { useForm } from "../../hooks";
import { ImageGallery } from "../components";
import { setActiveNote, startChangingStatus, startDeletingNote, startSavingNote, startUploadingFiles } from "../../store/journal";

import { AddAPhoto, DeleteOutline, ForwardToInboxOutlined, SaveOutlined, TaskAltOutlined, ThumbDownAltOutlined, ThumbUpAltOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, MenuItem, Select, TextField, Typography } from "@mui/material";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import MapWrapper from "../components/GoogleMaps/MapWrapper";




export const NoteView = () => {
    
    const dispatch =  useDispatch();
    const fileInputRef = useRef();

    const {active: activeNote, Provincias, Municipios, Raza, Sexo, messageSaved, isSaving} = useSelector(state => state.journal)
  
    const {id, title, body, provincia, municipio, sexo, raza, contacto, date, status, imageUrls, onInputChange, formState} = useForm(activeNote);

    const dateString = useMemo(() => {
        let fecha = moment(date);
        return fecha.format('LL');
        // return fecha.format('LL');
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
    let currentProvincia = '';
    const onProvinciaChange = () => {
        currentProvincia = provincia
    }

    const onDeleteNote = () => {
        dispatch(startDeletingNote());
    }
    const EnviarReporteAValidacion = () => {
        dispatch(startChangingStatus(2));
    }
    const aprobarReporte = () => {
        dispatch(startChangingStatus(4));
    }
    const rechazarReporte = () => {
        dispatch(startChangingStatus(3));
    }
    const resolverReporte = () => {
        dispatch(startChangingStatus(5));
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
                {/* Seccion de la fecha */}
                <Grid
                    container 
                    item
                    sm={12} md={3}                
                    justifyContent='flex-start'
                    alignContent='center'
                >
                    <Typography fontSize={24} fontWeight='light'>{dateString}</Typography>
                </Grid>
                {/*
                Status 0: Sin Guardar
                Status 1: Pendiente de Cambios
                Status 2: Pendiente de aprobacion
                Status 3: Rechazada
                Status 4: Aprobada
                Status 5: Resuelto
                Status 6: Expirada 
                */}
                {/* Seccion de cambio de estado */}
                <Grid
                    container 
                    item
                    sm={6} md={5}                
                    justifyContent='center'
                    alignContent='center'
                >
                    {(status != 0 && status != 1 && status != 2 && status != 4 ) && <>
                        <Typography fontSize={24} fontWeight='light'>Estatus: {
                            status == 3 ?   'Rechazado'   :
                            status == 5 ?   'Resuleto'    :
                                            'Expirado'
                        }</Typography>
                    </>}

                    {status == 1 && <>
                        <Button
                        disabled={isSaving}
                        onClick={ EnviarReporteAValidacion } 
                        color="primary"
                        sx={{ 
                            padding: 2                                                       
                        }}                 
                    >
                            <ForwardToInboxOutlined sx={{fontSize: 30, mr: 1}}/>
                        Enviar a Validacion
                    </Button>
                    </>}

                    {status == 2 && <>
                        <Button
                        disabled={isSaving}
                        onClick={ aprobarReporte } 
                        color="primary"
                        sx={{ 
                            padding: 2                                                       
                        }}                 
                    >
                            <ThumbUpAltOutlined sx={{fontSize: 30, mr: 1}}/>
                        Aprobar
                    </Button>
                    <Button
                        disabled={isSaving}
                        onClick={ rechazarReporte } 
                        color="error" 
                        sx={{ padding: 2}}                 >
                            <ThumbDownAltOutlined sx={{fontSize: 30, mr: 1}}/>
                        Rechazar
                    </Button>
                    </>}

                    
                    {status == 4 && <>
                        <Button
                        disabled={isSaving}
                        onClick={ resolverReporte } 
                        color="primary"
                        sx={{ 
                            padding: 2                                                       
                        }}                 
                    >
                            <TaskAltOutlined sx={{fontSize: 30, mr: 1}}/>
                        Resolver
                    </Button>
                    </>}

                </Grid>
                {/* Seccion de Edicion */}
                <Grid 
                    container
                    item
                    sm={6} md={4}                
                    justifyContent='flex-end'
                >
                    <input
                        type='file'
                        multiple
                        ref={fileInputRef}
                        onChange={onFileInputChange}
                        style={{display: 'none'}}
                    /> 
                    {(status == 0 || status == 1 || status == 3) && <>
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
                    <Button
                        onClick={onDeleteNote}
                        color="error"
                    >
                        <DeleteOutline/>
                        Delete
                    </Button>
                    </>}
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
                        placeholder="Agregue un Titulo"
                        label="Nombre"
                        sx={{ border: 'none', mb: 1}}
                        name="title"
                        value={ title }
                        onChange={onInputChange}
                    />
                    <TextField
                        variant="filled"
                        placeholder="Indique provincia"
                        select
                        label="Provincia"                        
                        sx={{ border: 'none', mb: 1, width: '50%' }}
                        name="provincia"
                        value={ provincia }
                        onChange={onInputChange}
                    >
                        {Provincias.map((option) => (
                            <MenuItem key={option.Provincia} value={option.Provincia}>
                            {option.Provincia}
                            </MenuItem>
                        ))}                       
                    </TextField>
                    <TextField
                        type="text"
                        variant="filled"
                        placeholder="Indique municipio"
                        label="Municipio"
                        select
                        sx={{ border: 'none', mb: 1, width: '50%' }}
                        name="municipio"
                        value={ municipio }
                        onChange={onInputChange}
                    >
                        {Municipios.map((option) => (
                            (provincia !== '') 
                            ? 
                            option.Provincia === provincia &&
                            <MenuItem key={option.Municipio} value={option.Municipio}>
                            {option.Municipio}
                            </MenuItem>
                            :
                            <MenuItem key={option.Municipio} value={option.Municipio}>
                            {option.Municipio}
                            </MenuItem>
                        ))}                       
                    </TextField>
                    <TextField
                        type="text"
                        variant="filled"
                        placeholder="Indique raza"
                        label="Raza"
                        sx={{ border: 'none', mb: 1, width: '50%' }}
                        name="raza"
                        select
                        value={ raza }
                        onChange={onInputChange}
                    >
                        {Raza.map((option) => (
                            <MenuItem key={option.Raza} value={option.Raza}>
                            {option.Raza}
                            </MenuItem>
                        ))}                       
                    </TextField>
                    <TextField
                        type="text"
                        variant="filled"
                        placeholder="Indique sexo"
                        label="Sexo" 
                        select                       
                        sx={{ border: 'none', mb: 1, width: '50%' }}
                        name="sexo"
                        value={ sexo }
                        onChange={onInputChange}
                    >
                        {Sexo.map((option) => (
                            <MenuItem key={option.Sexo} value={option.Sexo}>
                            {option.Sexo}
                            </MenuItem>
                        ))}                       
                    </TextField>

                    <TextField
                        type="text"
                        variant="filled"
                        fullWidth
                        multiline
                        placeholder="Describe mejor a tu mascota"
                        minRows={9}
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
            <MapWrapper zoom={15} />
            <Grid
                container
                item
                id = 'map'
                sx = {{
                    height: 500,
                    marginTop: 1
                    
                }}                          
            >
            </Grid>
            <Grid container justifyContent='flex-end'>

            </Grid>
        </Grid>
    )
}
