import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { Link as RouterLink} from "react-router-dom"
import { useForm } from "../../hooks"
import { startFormSignUp } from "../../store/auth"
import { AuthLayout } from "../layout/AuthLayout"

import { useDispatch, useSelector } from 'react-redux'


const DefaultData = {
  displayName: 'Jorge',
  email: 'prueba@gmail.com',
  password: '123456'
}

const formValidation = {
  displayName: [ (value) => value.length >= 1 ,"The name should have 1 letter"],
  email: [ (value) => value.includes('@'),"The email should have @"],
  password: [ (value) => value.length >= 6 ,"The password should have 6 characters"]
}

export const RegisterPage = () => {
  
  const [formSubmitted, setformSubmitted] = useState(false);
  const dispatch = useDispatch();

  const {status, errorMessage } = useSelector( state => state.auth)
  const isChecking =  status === 'checking';

  const { 
    formState, 
    displayName, email, password,
    isFormValid, displayNameValid, emailValid, passwordValid, 
    onInputChange 
  } = useForm(DefaultData,formValidation);
  
  const onSubmit = (event) => {
    event.preventDefault();
    setformSubmitted(true);

    if(!isFormValid) return;

    dispatch(startFormSignUp(formState));
    console.log(formState);
  }

  return (
    <AuthLayout title="PetSOS - Registrate">
      <form onSubmit={ onSubmit }>
        <Grid container>
          <Grid item xs={12} sx={{mt: 2}}>
            <TextField
              label="Nombre Completo"
              type="text"
              placeholder="your name"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error = {!!displayNameValid && formSubmitted}
              helperText = {!!displayNameValid && formSubmitted ? displayNameValid : null}
            />
          </Grid>
          <Grid item xs={12} sx={{mt: 2}}>
            <TextField
              label="Correo"
              type="email"
              placeholder="hola@gmail.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error = {!!emailValid && formSubmitted}
              helperText = {!!emailValid && formSubmitted ? emailValid : null}
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
              error = {!!passwordValid && formSubmitted}
              helperText = {!!passwordValid && formSubmitted ? passwordValid : null}
            />
          </Grid>

          <Grid container spacing={2} sx= {{mb: 2, mt: 1}}>
            <Grid item xs={12} sm={12} display={!!errorMessage?'':'none'}>
              <Alert severity="error" >
                {errorMessage}
              </Alert>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button 
                disabled = {isChecking}
                type="submit"  
                variant="contained" 
                fullWidth
              >
                Registrar
              </Button>
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <Button variant="contained" fullWidth>
                <Google/>
                <Typography sx={{ml:1}}>Google</Typography>
              </Button>
            </Grid> */}
          </Grid>

          <Grid container direction="row" justifyContent='end'>
            <Typography sx={{mr: 1}}>¿Ya estas registrado?</Typography>
            <Link component={RouterLink} color='inherit' to="/auth/login">
                Iniciar Sesión
            </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>
  )
}
