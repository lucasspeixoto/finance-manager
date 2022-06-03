import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React, { ReactNode } from 'react';

const PageTitle = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(4, 0)};
`,
);

const PageTitleWrapper: React.FC<{
  children?: ReactNode;
}> = ({ children }) => {
  return (
    <React.Fragment>
      <PageTitle>
        <Container maxWidth="lg">{children}</Container>
      </PageTitle>
    </React.Fragment>
  );
};

PageTitleWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageTitleWrapper;
