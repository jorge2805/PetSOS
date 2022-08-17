import { createSlice } from '@reduxjs/toolkit'

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        isSideBarOpen: true,
        messageSaved: '',
        notes: [],
        Provincias: [],
        Municipios: [],
        Raza: [],
        Sexo: [],
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
        setActiveNull: (state) => {
            state.active = null;
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setSelects: (state, action) => {
            console.log(action.payload.Raza);
            state.Provincias = action.payload.Provincias;
            state.Municipios = action.payload.Municipios;
            state.Raza = action.payload.Raza;
            state.Sexo = action.payload.Sexo;
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
        isSideBarOpenToggle: (state) => {
            state.isSideBarOpen = !state.isSideBarOpen;
        },
    },
})

export const { 
    savingNote,
    addNewEmptyNote,
    setActiveNote,
    setActiveNull,
    setNotes,
    setSelects,
    setSaving,
    updateNote,
    setPhotosToActiveNote,
    clearNotesLogOut,
    deleteNoteById,
    isSideBarOpenToggle
} = journalSlice.actions