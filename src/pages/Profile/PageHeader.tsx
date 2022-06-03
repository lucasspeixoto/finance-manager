import { Typography } from '@mui/material';
import { useAppSelector } from 'core/store/hooks';
import React from 'react';

const PageHeader: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <React.Fragment>
      <Typography variant="h3" component="h3" gutterBottom>
        Meu Perfil
      </Typography>
      <Typography variant="subtitle2">
        {user!.displayName}, bem vindo ao seu painel de configurações.
      </Typography>
    </React.Fragment>
  );
};

export default PageHeader;
