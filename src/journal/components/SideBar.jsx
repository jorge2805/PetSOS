import { Box, Divider, Drawer, IconButton, List, Toolbar, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { SideBarItem } from "./SideBarItem";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { isSideBarOpenToggle } from "../../store/journal";

export const SideBar = ({drawerWidth = 240}) => {
  
    const {displayName} = useSelector(state => state.auth);
    const {notes, isSideBarOpen} = useSelector(state => state.journal);
    
    const dispatch = useDispatch();

    const onCloseDrawer = () => {
        dispatch(isSideBarOpenToggle());
    }

  return (
    <Box
        component='nav'
        sx={{width: { sm: drawerWidth}, flexShrink: { sm: 0}}}
    >
        <Drawer
            variant="persistent"
            open = {isSideBarOpen}
            sx={{
                display: { xs: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth}
            }}
        >
            <Toolbar>
                <Typography variant="h6" noWrap component="div">                    
                    Reportes - {displayName}
                </Typography>
                <IconButton 
                onClick={onCloseDrawer}
                sx={{ display: {sm: 'none'}}}
                >
                    <KeyboardArrowLeftIcon />
                </IconButton>
            </Toolbar>
            <Divider/>

            <List>
                {
                    notes.map( note => (
                        <SideBarItem key={note.id} {...note}/>
                    ))
                }
            </List>
        </Drawer>

    </Box>
  )
}
