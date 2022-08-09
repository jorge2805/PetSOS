import { Box, Toolbar } from "@mui/material"
import { NavBar, SideBar } from "../components"

const drawerWidth = 0;

export const AdminLayout = ({children}) => {
  return (
    <Box sx={{ display: 'flex' }}>

        <NavBar drawerWidth={drawerWidth}/>

        {/* <SideBar drawerWidth={drawerWidth}/> */}

        <Box 
            component='main'
            sx={{ flexGrow: 1, p: 3}}
        >
            <Toolbar/>
            {children}
        </Box>

    </Box>
  )
}
