import { CssBaseline } from '@mui/material';
import App from 'App';
import { AuthContextProvider } from 'core/context/AuthContext';
import { SnackBarProvider } from 'core/context/SnackbarContext';
import { ThemeProviderWrapper } from 'core/context/ThemeContext';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <HelmetProvider>
        <ThemeProviderWrapper>
          <SnackBarProvider>
            <CssBaseline />
            <App />
          </SnackBarProvider>
        </ThemeProviderWrapper>
      </HelmetProvider>
    </AuthContextProvider>
  </React.StrictMode>,
);
