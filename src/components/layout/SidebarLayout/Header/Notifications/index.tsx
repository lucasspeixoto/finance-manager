import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  Popover,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useRef, useState } from 'react';

import { NotificationsBadge } from './styled';

const Notifications: React.FC = () => {
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <React.Fragment>
      <Tooltip arrow title="Notificações">
        <IconButton color="primary" ref={ref} onClick={() => setOpen(true)}>
          <NotificationsBadge
            badgeContent={2}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <NotificationsActiveTwoToneIcon />
          </NotificationsBadge>
        </IconButton>
      </Tooltip>
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
        <Box
          sx={{ p: 2 }}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h5">Notificações</Typography>
        </Box>
        <Divider />
        <List sx={{ p: 0 }}>
          <ListItem
            sx={{
              p: 2,
              minWidth: 350,
              display: { xs: 'block', sm: 'flex' },
            }}
          >
            <Box flex="1" sx={{ width: '100px' }}>
              <Box display="flex" justifyContent="space-between">
                <Typography sx={{ fontWeight: 'bold' }}>
                  Mensagens da Plataforma
                </Typography>
                <br />
                <br />
              </Box>
              <Typography component="span" variant="body2" color="text.secondary">
                Lorem ipsum dolor sit amet. Aut aspernatur voluptatum aut quidem galisum
                aut error dolores eos perspiciatis culpa in itaque voluptate eos repellat
                saepe.
              </Typography>
              <br />
              <br />
              <Typography component="span" variant="body2" color="text.secondary">
                Lorem ipsum dolor sit amet. Aut aspernatur voluptatum aut quidem galisum
                aut error dolores eos perspiciatis culpa in itaque voluptate eos repellat
                saepe.
              </Typography>
            </Box>
          </ListItem>
        </List>
      </Popover>
    </React.Fragment>
  );
};

export default Notifications;
