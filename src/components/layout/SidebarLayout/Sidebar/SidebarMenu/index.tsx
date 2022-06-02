import AnalyticsIcon from '@mui/icons-material/Analytics';
import { Button, ListItem, ListSubheader } from '@mui/material';
import React, { useContext } from 'react';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';

import { SidebarContext } from '../../../../../core/context/SidebarContext';
import { MenuItems } from './items';
import { MenuWrapper, SubMenuWrapper } from './styled';

interface SideBarMenuProps {
  menuItems: MenuItems[];
}

const SidebarMenu: React.FC<SideBarMenuProps> = ({ menuItems }) => {
  const location = useLocation();

  const { toggleSidebar } = useContext(SidebarContext);

  return (
    <React.Fragment>
      {menuItems.map((section) => (
        <MenuWrapper
          key={section.heading}
          subheader={
            <ListSubheader component="div" disableSticky>
              {section.heading}
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            {section.items.map((item, index) => (
              <ListItem component="div" key={index}>
                <Button
                  className={item.link === location.pathname ? 'Mui-active' : ''}
                  component={RouterLink}
                  onClick={toggleSidebar}
                  to={item.link}
                  startIcon={item.icon ? item.icon : <AnalyticsIcon />}
                >
                  {item.name}
                </Button>
              </ListItem>
            ))}
          </SubMenuWrapper>
        </MenuWrapper>
      ))}
    </React.Fragment>
  );
};

export default SidebarMenu;
