import { Hidden, Tooltip } from '@mui/material';
import React from 'react';

import appLogo from '../../../assets/favicon.svg';
import { AppLogo, LogoText, LogoTextWrapper, LogoWrapper, VersionBadge } from './styled';

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
