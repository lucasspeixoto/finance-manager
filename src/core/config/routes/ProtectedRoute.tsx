/* eslint-disable no-undef */
import Loading from 'components/elements/Loading';
import BaseLayout from 'components/layout/BaseLayout';
import SidebarLayout from 'components/layout/SidebarLayout';
import { useAuth } from 'core/hooks/useAuth';
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute: React.FC<{
  children: JSX.Element;
}> = ({ children }) => {
  const { user, isLoading, isLogged } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  console.log(isLogged);

  return (
    <React.Fragment>
      {!isLoading ? (
        <SidebarLayout>
          {isLogged === true ? <React.Fragment>{children}</React.Fragment> : null}
        </SidebarLayout>
      ) : (
        <BaseLayout>
          <Loading />
        </BaseLayout>
      )}
    </React.Fragment>
  );
};

export default ProtectedRoute;
