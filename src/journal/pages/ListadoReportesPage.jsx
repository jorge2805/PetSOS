import { useDispatch, useSelector } from "react-redux"

import { startNewNote } from "../../store/journal"

import { AddOutlined } from "@mui/icons-material"
import { IconButton } from "@mui/material"

import { UserLayout } from "../layout/UserLayout"
import { AdminLayout } from "../layout/AdminLayout"

import { NoteView } from "../views/NoteView"
import { NothingSelectedView } from "../views/NothingSelectedView"

export const ListadoReportesPage = () => {
  
  const dispatch = useDispatch();
  const {isSaving, active } = useSelector( state => state.journal);


  const onClickNewNote = () => {
    dispatch(startNewNote());
  }

  return (
    <AdminLayout>
      
      <h1>
        Listado de Reportes
      </h1>
      {/* {(!!active) ? <NoteView/> : <NothingSelectedView/> }       */}



    </AdminLayout>
  )
}
