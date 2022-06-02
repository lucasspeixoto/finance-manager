import { Drawer, Hidden } from '@mui/material';
import Logo from 'components/widgets/Logo';
import { useSidebar } from 'core/hooks/useSidebar';
import React, { useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';

import SidebarMenu from './SidebarMenu';
import { appMenuItems, MenuItems } from './SidebarMenu/items';
import { SidebarWrapper, TopSection } from './styled';

const Sidebar: React.FC = () => {
  const { sidebarToggle, toggleSidebar } = useSidebar();
  const closeSidebar = () => toggleSidebar();
  const [menuItems, setMenuItems] = useState<MenuItems[]>(appMenuItems);

  useEffect(() => {
    setMenuItems(appMenuItems);
  }, [menuItems]);

  return (
    <React.Fragment>
      <Hidden lgDown>
        <SidebarWrapper>
          <Scrollbars autoHide>
            <TopSection>
              <Logo />
            </TopSection>
            <SidebarMenu menuItems={menuItems} />
          </Scrollbars>
        </SidebarWrapper>
      </Hidden>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          open={sidebarToggle}
          onClose={closeSidebar}
          variant="temporary"
          elevation={9}
        >
          <SidebarWrapper>
            <Scrollbars autoHide>
              <TopSection>
                <Logo />
              </TopSection>
              <SidebarMenu menuItems={menuItems} />
            </Scrollbars>
          </SidebarWrapper>
        </Drawer>
      </Hidden>
    </React.Fragment>
  );
};

export default Sidebar;
