import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseFirestoreLite } from "../../firebase/config";
import { fileUpload } from "../../helpers/fileUpload";
import { getLatLong } from "../../helpers/getLatLong";
import { loadNotes } from "../../helpers/loadNotes";
import { loadSelects } from "../../helpers/loadSelects";
import { addNewEmptyNote, deleteNoteById, savingNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, setSelects, updateNote } from "./journalSlice";

export const startNewNote = () => {
    return async( dispatch, getState ) => {
        
        const { uid } = getState().auth;

        //Status 0: Sin Guardar
        //Status 1: Pendiente de Cambios
        //Status 2: Pendiente de aprobacion
        //Status 3: Rechazada
        //Status 4: Aprobada
        //Status 5: Resuelta
        //Status 6: Expirada
        
        const {latitude, longitude} = await getLatLong().then((hola) => { return {...hola}});

        const newNote = {
            title: '',
            body: '',
            provincia: '',
            municipio: '',
            lat: latitude,
            long: longitude,
            sexo: '',
            raza: '',
            contacto: '',
            status: 0,
            date: new Date().getTime(),
            imageUrls: []
        }

        dispatch(savingNote());

        const newDoc = doc( collection( FirebaseFirestoreLite, `${uid}/mascotas/reportes/`) );
        await setDoc(newDoc, newNote);
        
        newNote.id = newDoc.id;

        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
    }
}

export const startLoadingNotes = () => {
    return async( dispatch, getState ) => {
        
        const { uid } = getState().auth;

        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
        const selects = await loadSelects();
        dispatch(setSelects(selects));
    }
}

export const startSavingNote = () => {
    return async( dispatch, getState ) => {
        
        dispatch(setSaving());

        const { uid } = getState().auth;
        const { active:note } = getState().journal;
        
        const {latitude, longitude} = await getLatLong().then((location) => {
            return {
                latitude: location.latitude,
                longitude: location.longitude
            }
        });



        const newNote = {...note, lat: latitude, long: longitude, status: 1 };
        delete newNote.id; 
        const noteToUpdateRef = doc( FirebaseFirestoreLite, `${uid}/mascotas/reportes/${note.id}`);
        await setDoc(noteToUpdateRef, newNote, {merge: true});       

        dispatch(updateNote({...newNote, id: note.id}));
        dispatch(setActiveNote({...newNote, id: note.id}));
    }
}

export const startUploadingFiles = (files = []) => {
    return async( dispatch ) => {
        dispatch(setSaving());
        
        const myPromisesArray = [];
        for (const file of files) {
            myPromisesArray.push( fileUpload(file))
        }

        const photosUrls = await Promise.all( myPromisesArray );

        dispatch(setPhotosToActiveNote(photosUrls));
    }
}

export const startDeletingNote = () => {
    return async( dispatch, getState ) => {
        dispatch(setSaving());

        const {uid} = getState().auth;
        const {active: note} = getState().journal;

        const noteRef = doc( FirebaseFirestoreLite, `${uid}/mascotas/reportes/${note.id}`);
        await deleteDoc( noteRef);

        dispatch( deleteNoteById(note.id) );


        
        // async function printJSON() {
        //     const response = await fetch('provincias.json');
        //     const json = await response.json();

        //     var result = [];

        //     for(var i in json)
        //         result.push(json [i]);

        //     result.forEach((item) => {
        //         setDoc(doc( collection( FirebaseFirestoreLite, `Datos/Generales/Raza/`) ), item);
        //     });
        // }
        // printJSON();
          
    }
}

export const startChangingStatus = (status) => {
    return async( dispatch, getState ) => {
        dispatch(setSaving());

        const {uid} = getState().auth;
        const {active: note} = getState().journal;

        const noteToUpdateRef = doc( FirebaseFirestoreLite, `${uid}/mascotas/reportes/${note.id}`);
        await setDoc(noteToUpdateRef, {...note, status: status}, {merge: true});    

        dispatch(updateNote({...note, status: status}));
        dispatch(setActiveNote({...note, status: status}));
    }
}
