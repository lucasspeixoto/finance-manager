import PersonIcon from '@mui/icons-material/Person';
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';
import React from 'react';

export interface MenuItem {
  name: string;
  link: string;
  icon?: React.ReactNode;
}

export interface MenuItems {
  heading: string;
  items: MenuItem[];
}

export const appMenuItems: MenuItems[] = [
  {
    heading: 'Gestão Financeira',
    items: [
      {
        name: 'Perfil',
        link: '/profile',
        icon: <PersonIcon />,
      },
      {
        name: 'Dashboards',
        link: '/result',
        icon: <StackedBarChartIcon />,
      },
      {
        name: 'Nova Inclusão',
        link: '/search',
      },
      {
        name: 'Entradas',
        link: '/result',
      },
      {
        name: 'Saídas',
        link: '/search',
      },
    ],
  },
];
