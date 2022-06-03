import { Avatar, Card, CardContent, CardHeader, Grid, Link } from '@mui/material';
import { useAppSelector } from 'core/store/hooks';
import React from 'react';

const Overview: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <Card>
      {user ? (
        <CardHeader
          avatar={<Avatar src={user.photoURL!} />}
          titleTypographyProps={{ variant: 'h4' }}
          subheaderTypographyProps={{ variant: 'subtitle2' }}
          title={user.displayName}
          subheader={
            <>
              Mantenha o seu perfil do <Link underline="hover">Meu Financeiro</Link>{' '}
              sempre atualizado para uma melhor experiência.
            </>
          }
        />
      ) : null}
      <CardContent>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          sx={{ mt: 4 }}
        >
          <Grid item xs={9}>
            Form
          </Grid>
          <Grid item xs={3}>
            Image
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Overview;
