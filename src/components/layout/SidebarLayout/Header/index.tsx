import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import { Box, Hidden, IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useToggle } from 'core/hooks/useToggle';
import React from 'react';

import { useSidebar } from '../../../../core/hooks/useSidebar';
import { useTheme } from '../../../../core/hooks/useTheme';
import Switch from '../../../elements/Switch';
import { Notifications } from './Notifications';
import { HeaderUserbox } from './UserBox';

const HeaderWrapper = styled(Box)(
  ({ theme }) => `
		height: ${theme.header.height};
		color: ${theme.header.textColor};
		padding: ${theme.spacing(0, 2)};
		right: 0;
		z-index: 5;
		background-color: ${theme.header.background};
		box-shadow: ${theme.header.boxShadow};
		position: fixed;
		justify-content: space-between;
		width: 100%;
		@media (min-width: ${theme.breakpoints.values.lg}px) {
				left: ${theme.sidebar.width};
				width: auto;
		}
`,
);

export const Header = () => {
  const { sidebarToggle, toggleSidebar } = useSidebar();

  const { theme, changeTheme } = useTheme();

  const [checked, setChecked] = useToggle(theme === 'dark' ? true : false);

  //* Métodos
  const handleChangeTheme = () => {
    setChecked();
    theme == 'dark' ? changeTheme('light') : changeTheme('dark');
  };

  return (
    <HeaderWrapper display="flex" alignItems="center">
      <Box display="flex" alignItems="center">
        <Switch checked={checked} onChange={handleChangeTheme} />
      </Box>
      <Box display="flex" alignItems="center">
        <Notifications />
        <HeaderUserbox />
        <Hidden lgUp>
          <Tooltip arrow title="Menu">
            <IconButton color="primary" onClick={toggleSidebar}>
              {!sidebarToggle ? <MenuTwoToneIcon /> : <CloseTwoToneIcon />}
            </IconButton>
          </Tooltip>
        </Hidden>
      </Box>
    </HeaderWrapper>
  );
};
