/* eslint-disable no-undef */
import Loading from 'components/elements/Loading';
import BaseLayout from 'components/layout/BaseLayout';
import ForgotPassword from 'pages/ForgotPassword';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';
import React, { ComponentType, lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';

// eslint-disable-next-line react/display-name
const Loader = (Component: ComponentType) => (props: JSX.IntrinsicAttributes) =>
  (
    <Suspense
      fallback={
        <BaseLayout>
          <Loading />
        </BaseLayout>
      }
    >
      <Component {...props} />
    </Suspense>
  );

/* const SignIn = Loader(lazy(() => import('../../../pages/SignIn')));
const SignUp = Loader(lazy(() => import('../../../pages/SignUp'))); */
const Dashboard = Loader(lazy(() => import('../../../pages/Dashboard')));

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};
