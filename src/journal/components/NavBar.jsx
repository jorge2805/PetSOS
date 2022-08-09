import { LogoutOutlined, MenuOutlined, Person } from "@mui/icons-material"
import { AppBar, Button, Grid, IconButton, Link, Toolbar, Typography } from "@mui/material"
import { useDispatch } from "react-redux"
import { Link as RouterLink} from "react-router-dom"
import { startLogout } from "../../store/auth";

export const NavBar = ({drawerWidth = 240}) => {

    const dispatch =  useDispatch();
    const onClickLogout = () => {
        dispatch(startLogout()); 
    }

    const onClickAuthIcon = () => {
        console.log('onClickAuthIcon')
    }

    const onClickDashboard = () => {
        console.log('onClickDashboard')
    }

    const onClickReportList = () => {
        console.log('onClickReportList')
    }

  
return (
    <AppBar 
        position="fixed"
        sx={{
            width: { sm: `calc(100% - ${ drawerWidth }px)`},
            ml: { sm: `${ drawerWidth }px` }
         }}
    >
        <Toolbar>
            <IconButton
                color="inherit"
                edge="start"
                sx={{mr: 2, display: {sm: 'none'}}}
            >
                <MenuOutlined/>
            </IconButton>

            <Grid container direction='row' alignItems='center'>
                <Grid container item 
                    xs={10} md={10}
                    justifyContent="flex-start"
                    >

                    <Link 
                            component={RouterLink} 
                            to="/"
                            underline="none"
                            sx={{
                                color:'white'
                            }}
                            >
                        <Typography 
                            variant="h6" 
                            noWrap 
                            component='div'
                            style={{ borderRight: '0.1em solid white', paddingRight: '0.5em' }}
                        
                        > PetSOS
                        </Typography> 
                    </Link>
                    <Button 
                        onClick={onClickDashboard}
                        sx={{
                            color:'white'
                        }}
                    >
                        <Link 
                            component={RouterLink} 
                            underline="none"
                            to="/Dashboard"
                            sx={{
                                color:'white'
                            }}
                            >
                            <Typography  textAlign="center">Dashboard</Typography>
                        </Link>
                    </Button>
                    <Button 
                        onClick={onClickReportList}
                        sx={{
                            color:'white'
                        }}
                    >
                        <Link 
                            component={RouterLink} 
                            underline="none"
                            to="/ListadoReportes"
                            sx={{
                                color:'white'
                            }}
                            >
                            <Typography  textAlign="center">Listado Reportes</Typography>
                        </Link>
                    </Button>      
                </Grid>        
                <Grid container item
                    xs={2} md={2}
                    justifyContent='flex-end'
                    >
                    <IconButton 
                        onClick={onClickAuthIcon}
                        sx={{
                            color:'white'
                        }}
                    >
                        <Link 
                            component={RouterLink} 
                            underline="none"
                            to="/Profile"
                            sx={{
                                color:'white'
                            }}
                            >
                            <Person/>
                        </Link>
                    </IconButton>
                    <IconButton 
                        onClick={onClickLogout}
                        color='error'
                    >
                        <LogoutOutlined/>
                    </IconButton>
                </Grid>

            </Grid>

        </Toolbar>
    </AppBar>
  )
}
