import { CssBaseline } from '@mui/material';
import App from 'App';
import { ThemeProviderWrapper } from 'core/context/ThemeContext';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProviderWrapper>
        <CssBaseline />
        <App />
      </ThemeProviderWrapper>
    </HelmetProvider>
  </React.StrictMode>,
);
