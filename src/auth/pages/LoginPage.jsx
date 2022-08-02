import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Link as RouterLink} from "react-router-dom"
import { AuthLayout } from "../layout/AuthLayout"

import { useForm } from "../../hooks"
import { startDirectSignIn, startGoogleSignIn } from "../../store/auth"
import { useDispatch, useSelector } from "react-redux"
import { useMemo } from "react"

const initialFormData = {
  email: '  prueba@gmail.com',
  password: '123456'
}

export const LoginPage = () => {

  const dispatch = useDispatch();
  const {status, errorMessage} = useSelector( x => x.auth);
  const { email, password, onInputChange} = useForm(initialFormData);

  const onSubmit = (event) => {
    event.preventDefault();

    // dispatch(checkingAuthentication(email,password));
    
    dispatch(startDirectSignIn({email, password}));

  }

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  }

  const isAuth = useMemo( () => {return status === 'checking'},[status]);

  return (
    <AuthLayout title="PetSOS - Iniciar Sesión">
      <form onSubmit={onSubmit  }>
        <Grid container>
          <Grid item xs={12} sx={{mt: 2}}>
            <TextField
              label="Correo"
              type="email"
              placeholder="hola@gmail.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
            />
          </Grid>
          <Grid item xs={12} sx={{mt: 2}}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
            />
          </Grid>

          <Grid container spacing={2} sx= {{mb: 2, mt: 1}}>
            <Grid item xs={12} sm={12} display={!!errorMessage?'':'none'}>
              <Alert severity="error" >
                {errorMessage}
              </Alert>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button 
                disabled = {isAuth}
                type="submit" 
                variant="contained" 
                fullWidth
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button 
                disabled = {isAuth}
                onClick={onGoogleSignIn}
                variant="contained" fullWidth>
                <Google/>
                <Typography sx={{ml:1}}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent='end'>
            <Typography sx={{mr: 1}}>¿Aun no tienes cuenta?</Typography>
            <Link component={RouterLink} color='inherit' to="/auth/register">
              Registrate
            </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>
  )
}
