import { createTheme } from '@mui/material'
import { red } from '@mui/material/colors'


export const purpleTheme = createTheme({
    palette:{
        primary:{
            main: '#00838F'
        },
        secondary:{
            main: '#64B5F6'
        },
        error:{
            main: red.A400
        },
    }
})
