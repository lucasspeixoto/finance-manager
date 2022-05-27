/* eslint-disable no-undef */
import Loading from 'components/elements/Loading';
import BaseLayout from 'components/layout/BaseLayout';
/* import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp'; */
import React, { ComponentType, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

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

const Dashboard = Loader(lazy(() => import('../../../pages/Dashboard')));
const SignIn = Loader(lazy(() => import('../../../pages/SignIn')));
const SignUp = Loader(lazy(() => import('../../../pages/SignUp')));

export const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />
  </Routes>
);
