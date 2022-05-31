import { SnackBarContext } from 'core/context/SnackbarContext';
import { useContext } from 'react';

export function useSnackBar() {
  const contextData = useContext(SnackBarContext);

  return contextData;
}
