/* eslint-disable no-undef */
import Loading from 'components/elements/Loading';
import BaseLayout from 'components/layout/BaseLayout';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';

const ProtectedRoute: React.FC<{
  children: JSX.Element;
}> = ({ children }) => {
  const user = useAppSelector((state) => state.auth.user);
  const isLoading = useAppSelector((state) => state.auth.isLoading);

  const isUserUnauthenticationEmpty = user ? Object.keys(user).length === 0 : true;

  if (isLoading) {
    return (
      <BaseLayout>
        <Loading />
      </BaseLayout>
    );
  }

  if (!isUserUnauthenticationEmpty) {
    return <React.Fragment>{children}</React.Fragment>;
  }

  return <Navigate to="/" />;
};

export default ProtectedRoute;
