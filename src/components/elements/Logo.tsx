import { Box, Hidden, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { Link } from 'react-router-dom';

import appLogo from '../../assets/favicon.svg';

const LogoWrapper = styled(Link)(
  ({ theme }) => `
    color: ${theme.palette.text.primary};
    padding: ${theme.spacing(0, 1, 0, 0)};
    display: flex;
    text-decoration: none;
    font-weight: ${theme.typography.fontWeightBold};
`,
);

const LogoTextWrapper = styled(Box)(
  ({ theme }) => `
    padding-left: ${theme.spacing(1)};
`,
);

const VersionBadge = styled(Box)(
  ({ theme }) => `
    background: ${theme.palette.primary.main};
    color: ${theme.palette.success.contrastText};
    padding: ${theme.spacing(0.4, 1)};
    border-radius: ${theme.general.borderRadiusSm};
    text-align: center;
    display: inline-block;
    line-height: 1;
    font-size: ${theme.typography.pxToRem(15)};
`,
);

const AppLogo = styled('img')(
  () => `
    width: 40px
`,
);

const LogoText = styled(Box)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(20)};
    font-weight: ${theme.typography.fontWeightBold};
`,
);

const Logo: React.FC = () => {
  return (
    <React.Fragment>
      <LogoWrapper to="/dashboard">
        <AppLogo src={appLogo} alt="Logo Aplicação" />
        <Hidden smDown>
          <LogoTextWrapper>
            <Tooltip title="Versão 1.0.0" arrow placement="right">
              <VersionBadge>1.0.0</VersionBadge>
            </Tooltip>
            <LogoText>Meu Financeiro</LogoText>
          </LogoTextWrapper>
        </Hidden>
      </LogoWrapper>
    </React.Fragment>
  );
};

export default Logo;
