import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

import { Header } from './Header';
import { Sidebar } from './Sidebar';

const MainWrapper = styled(Box)(
  ({ theme }) => `
		flex: 1 1 auto;
		display: flex;
		height: 100%;
		
		@media (min-width: ${theme.breakpoints.values.lg}px) {
				padding-left: ${theme.sidebar.width};
		}
`,
);

const MainContent = styled(Box)(
  ({ theme }) => `
		margin-top: ${theme.header.height};
		flex: 1 1 auto;
		overflow: auto;
`,
);

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
