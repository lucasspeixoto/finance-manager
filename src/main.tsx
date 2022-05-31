import { CssBaseline } from '@mui/material';
import App from 'App';
import { SidebarProvider } from 'core/context/SidebarContext';
import { SnackBarProvider } from 'core/context/SnackbarContext';
import { ThemeProvider } from 'core/context/ThemeContext';
import store from 'core/store';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <SnackBarProvider>
          <SidebarProvider>
            <ThemeProvider>
              <CssBaseline />
              <App />
            </ThemeProvider>
          </SidebarProvider>
        </SnackBarProvider>
      </HelmetProvider>
    </Provider>
  </React.StrictMode>,
);
