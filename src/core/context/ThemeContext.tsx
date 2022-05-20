import { ThemeProvider } from '@mui/material';
import React, { createContext, useMemo } from 'react';

import { dartThemeCreator, lightThemeCreator } from '../config/themes/base';

interface IThemeContext {
  // eslint-disable-next-line no-unused-vars
  changeTheme(theme: string): void;
  theme: string;
}

export const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

export const ThemeProviderWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const lastSelectedTheme = useMemo(() => {
    return localStorage.getItem('appTheme') || 'dark';
  }, []);

  const [theme, setTheme] = React.useState(lastSelectedTheme);

  const darkTheme = dartThemeCreator('Dark');
  const lightTheme = lightThemeCreator('Light');

  const changeTheme = (theme: string) => {
    localStorage.setItem('appTheme', theme);
    setTheme(theme);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
