/* eslint-disable jsx-a11y/anchor-is-valid */
import styled from '@emotion/styled';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { IconButton, InputAdornment } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box, { BoxProps } from '@mui/material/Box';
import Grid, { GridProps } from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import AppButton from 'components/elements/AppButton';
import Switch from 'components/elements/Switch';
import Copyright from 'components/widgets/Copyright';
import { Error } from 'core/helpers/error-messages';
import { signinSchema } from 'core/helpers/schemas/signin-schema';
import { useSnackBar } from 'core/hooks/useSnackbar';
import { useTheme } from 'core/hooks/useTheme';
import { useToggle } from 'core/hooks/useToggle';
import { auth } from 'core/services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { TextField } from 'formik-mui';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';

import LoginBackground from './../assets/portrait-background.jpg';

interface SigninForm {
  email: string;
  password: string;
}

const initialValues: SigninForm = {
  email: '',
  password: '',
};

const BackgroundGrid = styled(Grid)<GridProps>(() => ({
  backgroundImage: `url(${LoginBackground})`, //url(https://source.unsplash.com/random)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}));

const SigninBox = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const SignIn: React.FC = () => {
  //* Estados
  const [showPassword, setShowPassword] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  //* Hooks
  const { theme, changeTheme } = useTheme();
  const { showSnackBar } = useSnackBar();
  const [checked, setChecked] = useToggle(theme === 'dark' ? true : false);
  const navigate = useNavigate();

  //* Métodos
  const handleChangeTheme = () => {
    setChecked();
    theme == 'dark' ? changeTheme('light') : changeTheme('dark');
  };

  // eslint-disable-next-line no-unused-vars
  const handleSubmit = async (values: SigninForm, actions: FormikHelpers<SigninForm>) => {
    setIsLoadingButton(true);

    const { email, password } = values;

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          setIsLoadingButton(false);
          showSnackBar(`Bem-vindo ao 'Meu Financeiro'`, 'success');
          navigate('/dashboard');
        }
      })
      .catch((error) => {
        setIsLoadingButton(false);
        const errorMessage = Error[error.code];
        showSnackBar(errorMessage, 'error');
      });

    setIsLoadingButton(false);
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <BackgroundGrid item xs={false} sm={4} md={8} />
        <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
          <Switch checked={checked} onChange={handleChangeTheme} />
          <SigninBox sx={{ my: 8, mx: 4 }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Formik
                initialValues={initialValues}
                validationSchema={signinSchema}
                onSubmit={handleSubmit}
              >
                {({ submitForm, isValid, dirty }) => (
                  <Form>
                    <Field
                      sx={{ mt: 0 }}
                      component={TextField}
                      margin="normal"
                      fullWidth
                      name="email"
                      type="email"
                      label="E-mail"
                    />
                    <Field
                      sx={{ mt: 0 }}
                      component={TextField}
                      margin="normal"
                      fullWidth
                      type={showPassword ? 'text' : 'password'}
                      label="Senha"
                      name="password"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword((prev) => !prev)}
                            >
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    {isLoadingButton ? <LinearProgress /> : null}
                    <AppButton
                      type="submit"
                      disabled={isLoadingButton || !isValid || !dirty}
                      onClick={submitForm}
                      label="Login"
                      icon={<PersonAddAlt1Icon />}
                    />
                  </Form>
                )}
              </Formik>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Link color="primary" to="/forgot-password">
                    Esqueceu a senha ?
                  </Link>
                </Grid>
                <Grid item>
                  <Link color="primary" to="/signup">
                    Não Possui conta? Cadastre-se
                  </Link>
                </Grid>
              </Grid>
              <Copyright
                text="Meu Financeiro"
                redirectUrl="https://lucasspeixoto.github.io/profile"
              />
            </Box>
          </SigninBox>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default SignIn;
