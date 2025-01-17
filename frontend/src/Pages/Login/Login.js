import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { useFormik } from 'formik';
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { loginInformationValidator } from '../../Services/Utils/YupModels/validateLogin';
import { login as LoginFunction } from "../../Services/Utils/AxiosPetitions/AxiosLogin"
import { Alert } from '@mui/material';

function Login() {
  const [LoggedIn, setLoggedIn] = useState(false);
  const [LoginEror, setLoginError] = useState({
    show: false,
    message: ""
  });
  const navigate = useNavigate();

  React.useEffect(() => {
    if (LoggedIn) navigate("/");

  }, [LoggedIn], []);

  //Message error handler
  React.useEffect(() => {
    if (!LoginEror.show) return;
    setTimeout(() => setLoginError({ show: false, message: "" }), 5000);

  }, [LoginEror])

  const formik = useFormik({
    initialValues: {
      id: '',
      password: ''
    },
    validationSchema: loginInformationValidator
  });

  const tryLogin = async (values) => {
    const [res, err] = await LoginFunction(values)
    console.log("err", err)
    if (err) {
      setLoginError({
        show: true,
        message: "Error trying to login"
      })
      return;
    }
    setLoggedIn(true);
  }

  const validateValues = async () => {
    await formik.validateForm();
    for (var key in formik.values) {
      formik.setFieldTouched(key, true);
    }

    return formik.isValid
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const valuesAreValid = await validateValues();
    if (!valuesAreValid) {
      setLoginError({
        show: true,
        message: "Invalid fields"
      })
      return;
    }

    tryLogin(formik.values);


  }

  return (
    <div>
      {LoginEror.show ?
        <Alert severity='error'>{LoginEror.message}</Alert>
        :
        null
      }

      <Box component='form' onSubmit={onSubmit} sx={{ mt: 1 }}>
        <TextField
          fullWidth
          error={Boolean(formik.touched.id && formik.errors.id)}
          helperText={formik.touched.id && formik.errors.id}
          label="Código del estudiante"
          name="id"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          required
          margin='normal'
          value={formik.values.id}
        />
        <TextField
          fullWidth
          error={Boolean(formik.touched.password && formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          margin='normal'
          label="Contraseña"
          name="password"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          required
          value={formik.values.password}
          type={'password'}
        />
        <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2, bgcolor: '#c52636' }}>
          Ingresar
        </Button>
        <Grid container>
          <Grid item xs> <Link href="#" variant="body2"> Forgot password? </Link> </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export { Login }