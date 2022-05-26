/* eslint-disable jsx-a11y/anchor-is-valid */
import styled from '@emotion/styled';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid, { GridProps } from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import AppButton from 'components/elements/AppButton';
import Switch from 'components/elements/Switch';
import Copyright from 'components/widgets/Copyright';
import { useTheme } from 'core/hooks/useTheme';
import { useToggle } from 'core/hooks/useToggle';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import * as Yup from 'yup';

const schema = Yup.object()
  .shape({
    email: Yup.string()
      .required('O E-mail é um campo obrigatório')
      .trim()
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'E-mail inválido!'),
    password: Yup.string()
      .required('A senha é um campo obrigatório')
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        'A Senha deve conter ao menos 8 caracteres, um maiusculo, um número e um caracter especial',
      ),
  })
  .required();

interface LoginForm {
  email: string;
  password: string;
}

const initialValues: LoginForm = {
  email: '',
  password: '',
};

const BackgroundGrid = styled(Grid)<GridProps>(() => ({
  backgroundImage: 'url(https://source.unsplash.com/random)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}));

const SignIn: React.FC = () => {
  const { theme, changeTheme } = useTheme();

  const [checked, setChecked] = useToggle(theme === 'dark' ? true : false);

  const [isLoadingButton, setIsLoadingButton] = useState(false);

  const handleChangeTheme = () => {
    setChecked();
    theme == 'dark' ? changeTheme('light') : changeTheme('dark');
  };

  const handleSubmitLoginForm = async (values: LoginForm) => {
    setIsLoadingButton(true);
    setTimeout(() => {
      setIsLoadingButton(false);
      alert(JSON.stringify(values, null, 2));
    }, 2500);
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
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Formik
                initialValues={initialValues}
                validationSchema={schema}
                onSubmit={handleSubmitLoginForm}
              >
                {({ submitForm }) => (
                  <Form>
                    <Field
                      component={TextField}
                      margin="normal"
                      fullWidth
                      name="email"
                      type="email"
                      label="Email"
                    />
                    <Field
                      component={TextField}
                      margin="normal"
                      fullWidth
                      type="password"
                      label="Password"
                      name="password"
                    />
                    {isLoadingButton ? <LinearProgress /> : null}
                    <AppButton
                      type="submit"
                      disabled={isLoadingButton}
                      onClick={submitForm}
                      label="Login"
                      icon={<PersonAddAlt1Icon />}
                    />
                  </Form>
                )}
              </Formik>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Esqueceu a senha?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {'Não Possui conta? Cadastre-se'}
                  </Link>
                </Grid>
              </Grid>
              <Copyright text="Seu Site" redirectUrl="https://mui.com" />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default SignIn;
