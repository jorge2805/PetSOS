import { useDispatch, useSelector } from "react-redux"

import { UserLayout } from "../layout/UserLayout"
import { NoteView } from "../views/NoteView"
import { ProfileView } from "../views/ProfileView"

export const ProfilePage = () => {
  
  const { active } = useSelector( state => state.journal);

  return (
    <UserLayout>

      {(!!active) ? <NoteView/> : <ProfileView/> }      

    </UserLayout>
  )
}
