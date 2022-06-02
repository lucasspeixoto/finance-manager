import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import * as React from 'react';

const Copyright: React.FC<{
  text: string;
  redirectUrl: string;
}> = ({ text, redirectUrl }) => {
  return (
    <Grid item justifyContent="flex-end">
      <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 3 }}>
        {'Copyright © '}
        <Link variant="inherit" target="_blank" href={redirectUrl}>
          {text}
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Grid>
  );
};

export default Copyright;
