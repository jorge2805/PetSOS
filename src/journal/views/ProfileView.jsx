import {useSelector} from "react-redux"

import { Person } from "@mui/icons-material"
import { Avatar, Grid, Typography } from "@mui/material"

export const ProfileView = () => {
  
  const {displayName, email, photoUrl} = useSelector(state => state.auth);


  return (
    <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: 'calc(100vh - 110px)', backgroundColor: 'primary.main', borderRadius: 3}}
    >
        <Grid item xs={12}>
            {photoUrl == null ? <Person sx={{ fontSize: 100, color: 'white'}}/> :             
             <Avatar 
             src={photoUrl} 
             sx ={{
              height: 150,
              width: 150,
              mb: 2
             }}
             />
            }
        </Grid>
        <Grid item xs={12}>
            <Typography color="white" variant="h5">{displayName}</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography color="white" variant="h5">{email}</Typography>
        </Grid>
    </Grid>
  )
}
