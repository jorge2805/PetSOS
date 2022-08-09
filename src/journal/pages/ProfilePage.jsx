import { useDispatch, useSelector } from "react-redux"

import { startNewNote } from "../../store/journal"

import { AddOutlined } from "@mui/icons-material"
import { IconButton } from "@mui/material"

import { UserLayout } from "../layout/UserLayout"
import { NoteView } from "../views/NoteView"
import { ProfileView } from "../views/ProfileView"

export const ProfilePage = () => {
  
  const dispatch = useDispatch();
  const {isSaving, active } = useSelector( state => state.journal);

  return (
    <UserLayout>

      {(!!active) ? <NoteView/> : <ProfileView/> }      

    </UserLayout>
  )
}
