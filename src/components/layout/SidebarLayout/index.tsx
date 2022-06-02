import React from 'react';

import Header from './Header';
import Sidebar from './Sidebar';
import { MainContent, MainWrapper } from './styled';

const SidebarLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <React.Fragment>
      <Sidebar />
      <MainWrapper>
        <Header />
        <MainContent>
          {/* <Outlet /> */}
          {children}
        </MainContent>
      </MainWrapper>
    </React.Fragment>
  );
};

export default SidebarLayout;
