/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-autofocus */
import LockOpenSharpIcon from '@mui/icons-material/LockOpenSharp';
import LockResetSharpIcon from '@mui/icons-material/LockResetSharp';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container, { ContainerProps } from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import AppButton from 'components/elements/AppButton';
import Switch from 'components/elements/Switch';
import Copyright from 'components/widgets/Copyright';
import { Error } from 'core/helpers/error-messages';
import { forgotPasswordSchema } from 'core/helpers/schemas/forgot-schema';
import { useSnackBar } from 'core/hooks/useSnackbar';
import { useTheme } from 'core/hooks/useTheme';
import { useToggle } from 'core/hooks/useToggle';
import { auth } from 'core/services/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { TextField } from 'formik-mui';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';

import LoginBackground from './../assets/landscape2-background.jpg';

interface ForgotPasswordForm {
  email: string;
}

const initialValues: ForgotPasswordForm = {
  email: '',
};

const BackgroundContainer = styled(Container)<ContainerProps>(() => ({
  backgroundImage: `url(${LoginBackground})`, //url(https://source.unsplash.com/random)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  minWidth: '100vw',
}));

const SignupContainer = styled(Container)<ContainerProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '20vh',
  padding: theme.spacing(2, 1),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.general.borderRadiusLg,
  boxShadow: theme.sidebar.boxShadow,
}));

const ForgotPassword: React.FC = () => {
  //* Estados
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  //* Hooks
  const { theme, changeTheme } = useTheme();
  const [checked, setChecked] = useToggle(theme === 'dark' ? true : false);
  const { showSnackBar } = useSnackBar();
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const handleChangeTheme = () => {
    setChecked();
    theme == 'dark' ? changeTheme('light') : changeTheme('dark');
  };

  const handleSubmit = async (
    values: ForgotPasswordForm,
    // eslint-disable-next-line no-unused-vars
    actions: FormikHelpers<ForgotPasswordForm>,
  ) => {
    setIsLoadingButton(true);

    const { email } = values;

    await sendPasswordResetEmail(auth, email)
      .then(() => {
        showSnackBar(
          `Um link para alteração de sua senha foi enviado no email ${email}. Acesse para trocar a sua senha`,
          'info',
        );
        navigate('/');
      })
      .catch((error) => {
        const errorMessage = Error[error.code];
        showSnackBar(errorMessage, 'error');
      });

    setIsLoadingButton(false);
  };

  return (
    <BackgroundContainer>
      <Helmet>
        <title>Recuperação de Senha</title>
      </Helmet>
      <Grid container justifyContent="flex-end">
        <Switch checked={checked} onChange={handleChangeTheme} />
      </Grid>
      <SignupContainer maxWidth="xs">
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOpenSharpIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          Recuperar Senha
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Formik
            initialValues={initialValues}
            validationSchema={forgotPasswordSchema}
            onSubmit={handleSubmit}
          >
            {({ submitForm, isValid, dirty }) => (
              <Form>
                <Field
                  sx={{ mt: 1 }}
                  component={TextField}
                  margin="normal"
                  fullWidth
                  name="email"
                  type="email"
                  label="E-mail"
                />

                {isLoadingButton ? <LinearProgress /> : null}
                <AppButton
                  type="submit"
                  disabled={isLoadingButton || !isValid || !dirty}
                  onClick={submitForm}
                  label="Recuperar"
                  icon={<LockResetSharpIcon />}
                />
              </Form>
            )}
          </Formik>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link color="primary" to="/">
                Login
              </Link>
            </Grid>
          </Grid>
        </Box>
        <Copyright
          text="Meu Financeiro"
          redirectUrl="https://lucasspeixoto.github.io/profile"
        />
      </SignupContainer>
    </BackgroundContainer>
  );
};

export default ForgotPassword;
