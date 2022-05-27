import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

const BaseLayout: React.FC<{
  children?: ReactNode;
}> = ({ children }) => {
  return <React.Fragment>{children || <Outlet />}</React.Fragment>;
};

export default BaseLayout;
