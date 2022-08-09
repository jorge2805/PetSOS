import { BookmarkAdd, Person, Pets } from "@mui/icons-material"
import { Grid, Typography } from "@mui/material"

export const ProfileView = () => {
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
            <Person sx={{ fontSize: 100, color: 'white'}}/>
        </Grid>
        <Grid item xs={12}>
            <Typography color="white" variant="h5">Profile View</Typography>
        </Grid>
    </Grid>
  )
}
