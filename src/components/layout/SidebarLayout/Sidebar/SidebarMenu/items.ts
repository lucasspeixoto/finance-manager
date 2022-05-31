export interface MenuItem {
  name: string;
  link: string;
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
      },
      {
        name: 'Dashboards',
        link: '/result',
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
