import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import PersonIcon from '@mui/icons-material/Person';
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Hidden,
  lighten,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSnackBar } from 'core/hooks/useSnackbar';
import { auth } from 'core/services/firebase';
import { userActions } from 'core/store/auth-slice';
import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import { signOut } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`,
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`,
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`,
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`,
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${lighten(theme.palette.secondary.main, 0.5)}
`,
);

const HeaderUserbox: React.FC = () => {
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  const { showSnackBar } = useSnackBar();

  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await signOut(auth)
        .then(() => {
          navigate('/');
          dispatch(userActions.removeUser());
          showSnackBar('Você foi deslogado', 'info');
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          showSnackBar(`Error ao deslogar, tente novamente`, 'error');
        });
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      showSnackBar(`Error ao deslogar, tente novamente`, 'error');
    }
  };

  return (
    <React.Fragment>
      <UserBoxButton color="secondary" ref={ref} onClick={() => setOpen(true)}>
        <Avatar
          variant="rounded"
          alt={'Nome'}
          src="https://lh3.googleusercontent.com/a-/AOh14Gj37hwEKTk89_dqJj5ysJeo3PeQtRsf9t3FPyjdRQ=s96-c"
        />
        <Hidden mdDown>
          {user ? (
            <UserBoxText>
              <UserBoxLabel variant="body1">{user.displayName}</UserBoxLabel>
              <UserBoxDescription variant="body2">{user.email}</UserBoxDescription>
            </UserBoxText>
          ) : null}
        </Hidden>
        <Hidden smDown>
          <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
        </Hidden>
      </UserBoxButton>
      <Popover
        anchorEl={ref.current}
        onClick={() => setOpen(false)}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuUserBox sx={{ minWidth: 210 }} display="flex">
          <Avatar
            variant="rounded"
            alt={'Nome'}
            src="https://lh3.googleusercontent.com/a-/AOh14Gj37hwEKTk89_dqJj5ysJeo3PeQtRsf9t3FPyjdRQ=s96-c"
          />

          {user ? (
            <UserBoxText>
              <UserBoxLabel variant="body1">{user.displayName}</UserBoxLabel>
              <UserBoxDescription variant="body2">{user.email}</UserBoxDescription>
            </UserBoxText>
          ) : null}
        </MenuUserBox>
        <Divider sx={{ mb: 0 }} />
        <List sx={{ p: 1 }} component="nav">
          <ListItem button to="/profile" component={NavLink}>
            <PersonIcon fontSize="small" />
            <ListItemText primary="Meu Perfil" />
          </ListItem>
          <ListItem button to="/dashboard" component={NavLink}>
            <StackedBarChartIcon fontSize="small" />
            <ListItemText primary="Dashboards" />
          </ListItem>
        </List>
        <Divider />
        <Box sx={{ m: 1 }}>
          <Button color="primary" fullWidth onClick={() => handleLogout()}>
            <LockOpenTwoToneIcon sx={{ mr: 1 }} />
            Sair
          </Button>
        </Box>
      </Popover>
    </React.Fragment>
  );
};

export default HeaderUserbox;
