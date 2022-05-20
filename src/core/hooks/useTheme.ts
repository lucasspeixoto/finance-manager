import { useContext } from 'react';

import { ThemeContext } from '../context/ThemeContext';

export function useTheme() {
  const contextData = useContext(ThemeContext);

  return contextData;
}
