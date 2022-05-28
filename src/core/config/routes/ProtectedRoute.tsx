/* eslint-disable no-undef */
import SidebarLayout from 'components/layout/SidebarLayout';
import { useAuth } from 'core/hooks/useAuth';
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute: React.FC<{
  children: JSX.Element;
}> = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  return <SidebarLayout>{children}</SidebarLayout>;
};

export default ProtectedRoute;
