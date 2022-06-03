import { Container, Grid, Tab, Tabs, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Footer from 'components/layout/SidebarLayout/Footer';
import React, { ChangeEvent, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import MyProfile from './MyProfile';
import Overview from './Overview';
import Security from './Security';

const tabs: { value: string; label: string }[] = [
  { value: 'generic', label: 'Visão Geral' },
  { value: 'my_profile', label: 'Meu Cadastro' },
  { value: 'security', label: 'Privacidade' },
];

const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }
`,
);

const Profile: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('generic');

  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Perfil</title>
      </Helmet>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          sx={{ mt: 4 }}
        >
          <Grid item xs={3}>
            <Typography variant="h2" component="h2" gutterBottom>
              Meu Perfil
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <TabsWrapper
              onChange={handleTabsChange}
              value={currentTab}
              variant="scrollable"
              scrollButtons="auto"
              textColor="primary"
              indicatorColor="primary"
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </TabsWrapper>
          </Grid>
          <Grid item xs={12}>
            {currentTab === 'generic' && <Overview />}
            {currentTab === 'my_profile' && <MyProfile />}
            {currentTab === 'security' && <Security />}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </React.Fragment>
  );
};

export default Profile;
