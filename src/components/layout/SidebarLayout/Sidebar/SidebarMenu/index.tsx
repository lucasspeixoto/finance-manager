import AnalyticsIcon from '@mui/icons-material/Analytics';
import { Button, List, ListItem, ListSubheader } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useContext } from 'react';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';

import { SidebarContext } from '../../../../../core/context/SidebarContext';
import { MenuItems } from './items';

const MenuWrapper = styled(List)(
  ({ theme }) => `
    margin-bottom: ${theme.spacing(1)};
    padding: 0;

    & > .MuiList-root {
      padding: 0 ${theme.spacing(2)} ${theme.spacing(2)};
    }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.sidebar.menuItemHeadingColor};
      padding: ${theme.spacing(0.8, 2)};
      line-height: 1.4;
    }
`,
);

const SubMenuWrapper = styled(List)(
  ({ theme }) => `
    &.MuiList-root {
      padding: 0;

      .MuiList-root .MuiList-root .MuiListItem-root .MuiButton-root {
        font-weight: normal !important;
      }

      .MuiListItem-root {
        padding: 2px ${theme.spacing(2)};
    
        .MuiButton-root {
          display: flex;
          color: ${theme.sidebar.menuItemColor};
          background-color: ${theme.sidebar.menuItemBg};
          width: 100%;
          justify-content: flex-start;
          font-size: ${theme.typography.pxToRem(13)};
          padding-top: ${theme.spacing(0.8)};
          padding-bottom: ${theme.spacing(0.8)};
          position: relative;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(4)};

            .MuiBadge-standard {
              background: ${theme.colors.primary.main};
              font-size: ${theme.typography.pxToRem(9)};
              font-weight: bold;
              text-transform: uppercase;
              color: ${theme.palette.primary.contrastText};
            }
          }
    
          .MuiButton-startIcon,
          
          .MuiButton-startIcon {
            font-size: ${theme.typography.pxToRem(26)};
            margin-right: ${theme.spacing(1.5)};
            color: ${theme.sidebar.menuItemIconColor};
          }
          
          .MuiButton-endIcon {
            display: none;
           
          }

          &.Mui-active,
          &:hover {
            background-color: ${theme.sidebar.menuItemBgActive};
            color: ${theme.sidebar.menuItemColorActive};

            .MuiButton-startIcon,
            
          }
        }

        &.Mui-children {
          flex-direction: column;
          line-height: 1;
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 1px ${theme.spacing(0)};

            .MuiButton-root {
              font-size: ${theme.typography.pxToRem(13)};
              padding: ${theme.spacing(0.5, 2, 0.5, 6.5)};

              &.Mui-active,
              &:hover {
                background-color: ${theme.sidebar.menuItemBg};
              }
            }
          }
        }
      }
    }
`,
);

interface SideBarMenuProps {
  menuItems: MenuItems[];
}

export const SidebarMenu: React.FC<SideBarMenuProps> = ({ menuItems }) => {
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
