import React, { createContext, useState } from 'react';

interface SidebarContextProps {
  sidebarToggle: any;
  toggleSidebar: () => void;
}

export const SidebarContext = createContext<SidebarContextProps>(
  {} as SidebarContextProps,
);

export const SidebarProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const toggleSidebar = () => {
    setSidebarToggle(!sidebarToggle);
  };

  return (
    <SidebarContext.Provider value={{ sidebarToggle, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
