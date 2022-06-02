import { Box, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

const SpinnerBox = styled(Box)(
  ({ theme }) => `
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	backgroundColor: ${theme.colors.primary.dark};
`,
);

const Loading: React.FC = () => {
  return (
    <SpinnerBox display="flex" alignItems="center" justifyContent="center">
      <CircularProgress size={100} disableShrink thickness={4} />
    </SpinnerBox>
  );
};

export default Loading;
