/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-autofocus */
import { Visibility, VisibilityOff } from '@mui/icons-material';
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { IconButton, InputAdornment } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import AppButton from 'components/elements/AppButton';
import AppSwitch from 'components/widgets/AppSwitch';
import Copyright from 'components/widgets/Copyright';
import { Error } from 'core/helpers/error-messages';
import { signupSchema } from 'core/helpers/schemas/signup-schema';
import { useSnackBar } from 'core/hooks/useSnackbar';
import { useTheme } from 'core/hooks/useTheme';
import { useToggle } from 'core/hooks/useToggle';
import { auth, db } from 'core/services/firebase';
import { userActions } from 'core/store/auth-slice';
import { useAppDispatch } from 'core/store/hooks';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { TextField } from 'formik-mui';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';

import { BackgroundContainer, SignupContainer } from './styled';

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

const SignUp: React.FC = () => {
  //* Estados
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
  const dispatch = useAppDispatch();

  const handleSendEmailVerification = async () => {
    await sendEmailVerification(auth.currentUser!)
      .then(() => {
        showSnackBar('Email de confirmação enviado!', 'info');
      })
      .catch((error) => {
        const errorMessage = Error[error.code];
        showSnackBar(errorMessage, 'error');
      });
  };
  const handleInsertUserIntoDatabase = async () => {
    const { uid, displayName, email, photoURL } = auth!.currentUser!;
    const newUser = {
      uid: uid,
      displayName: displayName,
      email: email,
      photoURL: photoURL,
    };
    dispatch(userActions.saveUser(newUser));
    await setDoc(doc(db, 'users', `${newUser.uid}`), newUser);
  };

  const handleUpdateUserDisplayName = async (displayName: string) => {
    await updateProfile(auth.currentUser!, { displayName })
      .then(() => {
        handleInsertUserIntoDatabase();
      })
      .catch((error) => {
        const errorMessage = Error[error.code];
        showSnackBar(errorMessage, 'error');
      });
  };

  const handleCreateUserWithEmailAndPassword = async (
    values: SignupForm,
    // eslint-disable-next-line no-unused-vars
    actions: FormikHelpers<SignupForm>,
  ) => {
    setIsLoadingButton(true);

    const { name, email, password } = values;

    await createUserWithEmailAndPassword(auth, email, password)
      // userCredential: UserCredential
      .then(() => {
        handleUpdateUserDisplayName(name);
      })
      .catch((error) => {
        const errorMessage = Error[error.code];
        showSnackBar(errorMessage, 'error');
      })
      .finally(() => {
        handleSendEmailVerification();
        navigate('/dashboard');
        setIsLoadingButton(false);
      });
  };

  return (
    <BackgroundContainer>
      <Helmet>
        <title>Cadastro</title>
      </Helmet>
      <Grid container justifyContent="flex-end">
        <AppSwitch checked={checked} onChange={handleChangeTheme} />
      </Grid>
      <SignupContainer maxWidth="xs">
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <DataSaverOnIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          Cadastro
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Formik
            initialValues={initialValues}
            validationSchema={signupSchema}
            onSubmit={handleCreateUserWithEmailAndPassword}
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
                  label="E-mail"
                />
                <Field
                  sx={{ mt: 1 }}
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
        <Copyright
          text="Meu Financeiro"
          redirectUrl="https://lucasspeixoto.github.io/profile"
        />
      </SignupContainer>
    </BackgroundContainer>
  );
};

export default SignUp;
