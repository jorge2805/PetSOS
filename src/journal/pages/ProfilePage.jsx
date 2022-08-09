import { useDispatch, useSelector } from "react-redux"

import { startNewNote } from "../../store/journal"

import { AddOutlined } from "@mui/icons-material"
import { IconButton } from "@mui/material"

import { UserLayout } from "../layout/UserLayout"
import { NoteView } from "../views/NoteView"
import { NothingSelectedView } from "../views/NothingSelectedView"

export const ProfilePage = () => {
  
  const dispatch = useDispatch();
  const {isSaving, active } = useSelector( state => state.journal);

  return (
    <UserLayout>

      <h1>Profile Page</h1>

    </UserLayout>
  )
}
