import { useDispatch, useSelector } from "react-redux"

import { startNewNote } from "../../store/journal"

import { AddOutlined } from "@mui/icons-material"
import { IconButton } from "@mui/material"

import { UserLayout } from "../layout/UserLayout"
import { AdminLayout } from "../layout/AdminLayout"

import { NoteView } from "../views/NoteView"
import { NothingSelectedView } from "../views/NothingSelectedView"

import MapWrapper from "../components/GoogleMaps/MapWrapper"

export const DashboardPage = () => {
  
  const dispatch = useDispatch();
  const {isSaving, active } = useSelector( state => state.journal);


  const onClickNewNote = () => {
    dispatch(startNewNote());
  }

  return (
    <AdminLayout>

      {/* {(!!active) ? <NoteView/> : <NothingSelectedView/> }       */}

      <h1>Dashboard</h1>
      <MapWrapper />
      <div style={{ height: "500px" }} id="map"></div>

    </AdminLayout>
  )
}
