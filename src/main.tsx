import { CssBaseline } from '@mui/material';
import App from 'App';
import { SidebarProvider } from 'core/context/SidebarContext';
import { SnackBarProvider } from 'core/context/SnackbarContext';
import { ThemeProviderWrapper } from 'core/context/ThemeContext';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import store from 'store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <AuthContextProvider> */}
      <HelmetProvider>
        <SidebarProvider>
          <ThemeProviderWrapper>
            <SnackBarProvider>
              <CssBaseline />
              <App />
            </SnackBarProvider>
          </ThemeProviderWrapper>
        </SidebarProvider>
      </HelmetProvider>
      {/* </AuthContextProvider> */}
    </Provider>
  </React.StrictMode>,
);
