import AnalyticsIcon from '@mui/icons-material/Analytics';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
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
import React, { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { TitleCase } from '../../../../../core/helpers/format-data';
import { useAuth } from '../../../../../core/hooks/useAuth';

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

export const HeaderUserbox: React.FC = () => {
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const { logout, user } = useAuth();

  return (
    <React.Fragment>
      <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
        <Avatar
          variant="rounded"
          alt={'Nome'}
          src="https://lh3.googleusercontent.com/a-/AOh14Gj37hwEKTk89_dqJj5ysJeo3PeQtRsf9t3FPyjdRQ=s96-c"
        />
        <Hidden mdDown>
          {user ? (
            <UserBoxText>
              <UserBoxLabel variant="body1">
                {TitleCase(user ? user?.name : '')}
              </UserBoxLabel>
              <UserBoxDescription variant="body2">
                {TitleCase(user ? user?.name : '')}
              </UserBoxDescription>
            </UserBoxText>
          ) : null}
        </Hidden>
        <Hidden smDown>
          <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
        </Hidden>
      </UserBoxButton>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
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
          <UserBoxText>
            <UserBoxLabel variant="body1">
              {TitleCase('lucas sacramoni peixoto')}
            </UserBoxLabel>
            <UserBoxDescription variant="body2">
              {TitleCase('desenvolvedor de aplicações')}
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Divider sx={{ mb: 0 }} />
        <List sx={{ p: 1 }} component="nav">
          <ListItem button to="/search" component={NavLink}>
            <PersonSearchIcon fontSize="small" />
            <ListItemText primary="Nova Pesquisa" />
          </ListItem>
          <ListItem button to="/result" component={NavLink}>
            <AnalyticsIcon fontSize="small" />
            <ListItemText primary="Resultado" />
          </ListItem>
        </List>
        <Divider />
        <Box sx={{ m: 1 }}>
          <Button color="primary" fullWidth onClick={logout}>
            <LockOpenTwoToneIcon sx={{ mr: 1 }} />
            Sair
          </Button>
        </Box>
      </Popover>
    </React.Fragment>
  );
};
