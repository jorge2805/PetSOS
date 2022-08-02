import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseFirestoreLite } from "../../firebase/config";
import { fileUpload } from "../../helpers/fileUpload";
import { loadNotes } from "../../helpers/loadNotes";
import { addNewEmptyNote, deleteNoteById, savingNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";

export const startNewNote = () => {
    return async( dispatch, getState ) => {
        
        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imageUrls: []
        }

        dispatch(savingNote());

        const newDoc = doc( collection( FirebaseFirestoreLite, `${uid}/journal/notes`) );
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
    }
}

export const startSavingNote = () => {
    return async( dispatch, getState ) => {
        
        dispatch(setSaving());

        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const newNote = {...note};
        delete newNote.id;        
        
        const noteToUpdateRef = doc( FirebaseFirestoreLite, `${uid}/journal/notes/${note.id}`);
        await setDoc(noteToUpdateRef, newNote, {merge: true});       

        dispatch(updateNote(note));
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

        const noteRef = doc( FirebaseFirestoreLite, `${uid}/journal/notes/${note.id}`);
        await deleteDoc( noteRef);

        dispatch( deleteNoteById(note.id) );

    }
}
