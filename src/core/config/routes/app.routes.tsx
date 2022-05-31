/* eslint-disable no-undef */
import Loading from 'components/elements/Loading';
import BaseLayout from 'components/layout/BaseLayout';
import SidebarLayout from 'components/layout/SidebarLayout';
import React, { ComponentType, lazy, Suspense } from 'react';
import { RouteObject } from 'react-router';
import { Navigate } from 'react-router-dom';

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

export const appRoutes: RouteObject[] = [
  {
    path: '*',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },

      {
        path: '*',
        element: <Navigate to="/dashboard" replace />,
      },
    ],
  },
];
