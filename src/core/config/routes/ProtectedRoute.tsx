/* eslint-disable no-undef */
import Loading from 'components/elements/Loading';
import SidebarLayout from 'components/layout/SidebarLayout';
import { useAuth } from 'core/hooks/useAuth';
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute: React.FC<{
  children: JSX.Element;
}> = ({ children }) => {
  const { isLoading, user } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  } else if (isLoading) {
    return <Loading />;
  }

  return <SidebarLayout>{children}</SidebarLayout>;
};

export default ProtectedRoute;
