import { createSlice } from '@reduxjs/toolkit'

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null
        // active: {
        //     id: 'sdfa',
        //     title: 'fasdfsd',
        //     body: '',
        //     date: 12213124,
        //     imageUrls: []
        // }
    },
    reducers: {
        savingNote: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push( action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.active = action.payload;
            state.messageSaved = '';
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        updateNote: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.map( note => {                
                return (note.id === action.payload.id) ? action.payload : note;
            });
            state.messageSaved = `${ action.payload.title } actualizada correctamente.`;
        },
        setPhotosToActiveNote: (state, action) => {
            state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
            state.isSaving = false;
        },                
        clearNotesLogOut: (state) => {
            state.isSaving = false,
            state.messageSaved = '',
            state.notes = [],
            state.active = null
        },                
        deleteNoteById: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.filter( note => {                
                return note.id !== action.payload;
            });
            state.active = null;
        },
    },
})

export const { 
    savingNote,
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    setPhotosToActiveNote,
    clearNotesLogOut,
    deleteNoteById 
} = journalSlice.actions