/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-autofocus */
import Container, { ContainerProps } from '@mui/material/Container';
import { styled } from '@mui/material/styles';

import LoginBackground from '../../../assets/landscape-background.jpg';

export const BackgroundContainer = styled(Container)<ContainerProps>(() => ({
  backgroundImage: `url(${LoginBackground})`, //url(https://source.unsplash.com/random)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  minWidth: '100vw',
}));

export const SignupContainer = styled(Container)<ContainerProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2, 1),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.general.borderRadiusLg,
  boxShadow: theme.sidebar.boxShadow,
}));
