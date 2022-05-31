import { Box, Container, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

const FooterWrapper = styled(Box)(
  ({ theme }) => `
        border-radius: 0;
        margin: ${theme.spacing(3)} 0;
`,
);

const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <Container maxWidth="lg">
        <Box
          py={1}
          display={{ xs: 'block', sm: 'flex' }}
          alignItems="center"
          textAlign={{ xs: 'center', sm: 'left' }}
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="subtitle1">
              &copy; {new Date().getFullYear()} - Meu financeiro
            </Typography>
          </Box>
          <Typography variant="subtitle1">
            Criado por{' '}
            <Link
              href="https://lucasspeixoto.github.io/profile"
              target="_blank"
              rel="noopener noreferrer"
            >
              Lucas Peixoto
            </Link>
          </Typography>
        </Box>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;
