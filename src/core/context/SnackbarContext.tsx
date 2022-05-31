import { Alert, AlertColor, Snackbar, Stack } from '@mui/material';
import React, { createContext, useState } from 'react';

interface SnackBarContextActions {
  // eslint-disable-next-line no-unused-vars
  showSnackBar: (text: string, severity: AlertColor) => void;
}

export const SnackBarContext = createContext({} as SnackBarContextActions);

interface SnackBarContextProviderProps {
  children: React.ReactNode;
}

export const SnackBarProvider: React.FC<SnackBarContextProviderProps> = ({
  children,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [severity, setSeverity] = useState<AlertColor>('info');

  const showSnackBar = (text: string, severity: AlertColor) => {
    setOpen(true);
    setMessage(text);
    setSeverity(severity);
  };

  const handleClose = () => {
    setOpen(false);
    setSeverity('info');
  };

  return (
    <SnackBarContext.Provider value={{ showSnackBar }}>
      {children}
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      </Stack>
    </SnackBarContext.Provider>
  );
};
