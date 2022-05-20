import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

export const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Navigate to="signin" replace />} />
    <Route path="signin" element={<SignIn />} />
    <Route path="signup" element={<SignUp />} />
    <Route path="*" element={<Navigate to="signin" replace />} />
  </Routes>
);
