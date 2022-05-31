import React from 'react';
import { Helmet } from 'react-helmet-async';

const Dashboard: React.FC = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Dashboards</title>
      </Helmet>
      <h1>Dashboards</h1>
    </React.Fragment>
  );
};

export default Dashboard;
