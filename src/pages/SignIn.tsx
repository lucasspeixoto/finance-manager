/* eslint-disable jsx-a11y/anchor-is-valid */
import { Login } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AuthButton from 'components/elements/AuthButton';
import Switch from 'components/elements/Switch';
import Copyright from 'components/widgets/Copyright';
import { useTheme } from 'core/hooks/useTheme';
import React, { ChangeEvent, useState } from 'react';

const SignIn: React.FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
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
    <React.Fragment>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={8}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
          <Switch checked={checked} onChange={changeThemeHandle} />
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
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="E-mail"
                name="email"
                autoComplete="email"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Lembrar"
              />
              <AuthButton
                type="submit"
                disabled={false}
                label="Entrar"
                icon={<Login />}
              />
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
