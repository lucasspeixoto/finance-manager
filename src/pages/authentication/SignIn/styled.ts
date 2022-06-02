/* eslint-disable jsx-a11y/anchor-is-valid */
import styled from '@emotion/styled';
import Box, { BoxProps } from '@mui/material/Box';
import Grid, { GridProps } from '@mui/material/Grid';

import LoginBackground from '../../../assets/portrait-background.jpg';

export const BackgroundGrid = styled(Grid)<GridProps>(() => ({
  backgroundImage: `url(${LoginBackground})`, //url(https://source.unsplash.com/random)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}));

export const SigninBox = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));
