import { useContext } from 'react';

import { SidebarContext } from '../context/SidebarContext';

export function useSidebar() {
  const contextData = useContext(SidebarContext);

  return contextData;
}
