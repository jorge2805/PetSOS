import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Pets, TurnedInNot } from '@mui/icons-material'
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveNote } from '../../store/journal';

export const SideBarItem = ({id, title = '', body = '', date, imageUrls}) => {
  
  const dispatch = useDispatch();

  const trunkTitle = useMemo(() => {
    return title.length > 17 
      ? title.substring(0,17) + '...'
      : title;
  }, [title])

  const trunkBody = useMemo(() => {
    return body.length > 40 
      ? body.substring(0,40) + '...'
      : body;
  }, [body])
  
  const handleListItem = () => {
    dispatch(setActiveNote({id, title, body, date, imageUrls}));
  }

  return (
    <ListItem disablePadding>
        <ListItemButton
          onClick={ handleListItem }
        >
            <ListItemIcon>
                <Pets/>
            </ListItemIcon>
            <Grid container>
                <ListItemText primary={trunkTitle}/>
                <ListItemText secondary={ trunkBody} />
            </Grid>
        </ListItemButton>
    </ListItem>
  );
}
