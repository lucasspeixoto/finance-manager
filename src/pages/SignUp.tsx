/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-autofocus */
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Container, { ContainerProps } from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AuthButton from 'components/elements/AuthButton';
import Switch from 'components/elements/Switch';
import Copyright from 'components/widgets/Copyright';
import { useTheme } from 'core/hooks/useTheme';
import React, { ChangeEvent, FormEvent, useState } from 'react';

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
  padding: theme.spacing(3, 1),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.general.borderRadiusLg,
  boxShadow: theme.sidebar.boxShadow,
}));

const SignUp: React.FC = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const { theme, changeTheme } = useTheme();

  /**
   * checked = true (Na direita) Dark | false (Na esquerda) Light
   */
  const [checked, setChecked] = useState<boolean>(() => {
    return theme == 'dark' ? true : false;
  });

  const changeThemeHandle = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    theme == 'dark' ? changeTheme('light') : changeTheme('dark');
  };

  return (
    <BackgroundContainer>
      <Switch checked={checked} onChange={changeThemeHandle} />
      <SignupContainer maxWidth="sm">
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          Cadastro
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="Nome"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Sobrenome"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="E-mail"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Quero receber notificações, promoções de marketing e atualizações por e-mail."
              />
            </Grid>
          </Grid>
          <AuthButton
            type="submit"
            disabled={false}
            label="Cadastrar"
            icon={<PersonAddAlt1Icon />}
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
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
