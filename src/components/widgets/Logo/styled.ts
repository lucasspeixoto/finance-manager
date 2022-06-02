import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

export const LogoWrapper = styled(Link)(
  ({ theme }) => `
    color: ${theme.palette.text.primary};
    padding: ${theme.spacing(0, 1, 0, 0)};
    display: flex;
    text-decoration: none;
    font-weight: ${theme.typography.fontWeightBold};
`,
);

export const LogoTextWrapper = styled(Box)(
  ({ theme }) => `
    padding-left: ${theme.spacing(1)};
`,
);

export const VersionBadge = styled(Box)(
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

export const AppLogo = styled('img')(
  () => `
    width: 40px
`,
);

export const LogoText = styled(Box)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(20)};
    font-weight: ${theme.typography.fontWeightBold};
`,
);
