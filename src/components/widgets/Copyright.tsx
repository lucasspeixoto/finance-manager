import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import * as React from 'react';

interface CopyrightProps {
  text: string;
  redirectUrl: string;
}

const Copyright: React.FC<CopyrightProps> = ({ text, redirectUrl }) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 5 }}>
      {'Copyright © '}
      <Link color="inherit" target="_blank" href={redirectUrl}>
        {text}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default Copyright;
