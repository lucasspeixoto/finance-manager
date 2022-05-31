import { ThemeProvider } from '@mui/material';
import { useLocalStorage } from 'core/hooks/useLocalStorage';
import React, { createContext, useState } from 'react';

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
  const [selectedTheme, setSelectedTheme] = useLocalStorage<string>(
    '@meu-financeiro: theme',
    'dark',
  );

  const [theme, setTheme] = useState(selectedTheme);

  const darkTheme = dartThemeCreator('Dark');
  const lightTheme = lightThemeCreator('Light');

  const changeTheme = (theme: string) => {
    setSelectedTheme(theme);
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
