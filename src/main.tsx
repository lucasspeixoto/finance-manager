import { CssBaseline } from '@mui/material';
import App from 'App';
import { ThemeProviderWrapper } from 'core/context/ThemeContext';
import React from 'react';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProviderWrapper>
      <CssBaseline />
      <App />
    </ThemeProviderWrapper>
  </React.StrictMode>,
);
