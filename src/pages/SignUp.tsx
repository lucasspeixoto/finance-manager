/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-autofocus */
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { IconButton, InputAdornment } from '@mui/material';
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
import { signupSchema } from 'core/helpers/schemas/signup-schema';
import { useAuth } from 'core/hooks/useAuth';
import { useSnackBar } from 'core/hooks/useSnackbar';
import { useTheme } from 'core/hooks/useTheme';
import { useToggle } from 'core/hooks/useToggle';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { TextField } from 'formik-mui';
import React, { ChangeEvent, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';

interface SignupForm {
  name: string;
  email: string;
  password: string;
}

const initialValues: SignupForm = {
  name: '',
  email: '',
  password: '',
};
//import LoginBackground from './../assets/login-background.png';

const BackgroundContainer = styled(Container)<ContainerProps>(() => ({
  backgroundImage: 'url(https://source.unsplash.com/random)',
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
  padding: theme.spacing(2, 1),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.general.borderRadiusLg,
  boxShadow: theme.sidebar.boxShadow,
}));

const SignUp: React.FC = () => {
  //* Estados
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  //* Hooks
  const { handleCreateUserWithNameEmailAndPassword } = useAuth();
  const { theme, changeTheme } = useTheme();
  const [checked, setChecked] = useToggle(theme === 'dark' ? true : false);
  const { showSnackBar } = useSnackBar();
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const handleChangeTheme = (event?: ChangeEvent<HTMLInputElement>) => {
    //event.preventDefault();
    setChecked();
    theme == 'dark' ? changeTheme('light') : changeTheme('dark');
  };

  // eslint-disable-next-line no-unused-vars
  const handleSubmit = async (values: SignupForm, actions: FormikHelpers<SignupForm>) => {
    setIsLoadingButton(true);

    const { name, email, password } = values;

    try {
      handleCreateUserWithNameEmailAndPassword(name, email, password);
      setIsLoadingButton(false);
      showSnackBar(`Bem Vindo: ${name.split(' ')[0]}`, 'success');
      navigate('/dashboard');
    } catch (error: any) {
      setIsLoadingButton(false);
      const errorMessage = Error[error.code];
      showSnackBar(errorMessage, 'error');
    }

    /* await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential: UserCredential) => {
        const { email, uid } = userCredential.user;
        const loggedUser: User = {
          id: uid,
          name: name,
          email: email,
          avatar: '',
        };
        registerUser(loggedUser);
        setIsLoadingButton(false);
        showSnackBar(`Bem Vindo: ${name.split(' ')[0]}`, 'success');
        navigate('/dashboard');
      })
      .catch((error) => {
        setIsLoadingButton(false);
        const errorMessage = Error[error.code];
        showSnackBar(errorMessage, 'error');
      }); */
  };

  return (
    <BackgroundContainer>
      <Helmet>
        <title>Cadastro</title>
      </Helmet>
      <Grid container justifyContent="flex-end">
        <Switch checked={checked} onChange={handleChangeTheme} />
      </Grid>
      <SignupContainer maxWidth="sm">
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          Cadastro
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Formik
            initialValues={initialValues}
            validationSchema={signupSchema}
            onSubmit={handleSubmit}
          >
            {({ submitForm, isValid, dirty }) => (
              <Form>
                <Field
                  sx={{ mt: 1 }}
                  component={TextField}
                  margin="normal"
                  fullWidth
                  name="name"
                  type="text"
                  label="Nome"
                />
                <Field
                  sx={{ mt: 1 }}
                  component={TextField}
                  margin="normal"
                  fullWidth
                  name="email"
                  type="email"
                  label="Email"
                />
                <Field
                  sx={{ mt: 1 }}
                  component={TextField}
                  margin="normal"
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
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
                  label="Cadastrar"
                  icon={<PersonAddAlt1Icon />}
                />
              </Form>
            )}
          </Formik>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link color="primary" to="/">
                Ja possui uma conta ? Login
              </Link>
            </Grid>
          </Grid>
        </Box>
        <Copyright text="Seu Site" redirectUrl="https://mui.com" />
      </SignupContainer>
    </BackgroundContainer>
  );
};

export default SignUp;
