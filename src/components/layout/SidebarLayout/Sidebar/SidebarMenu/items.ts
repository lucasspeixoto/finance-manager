export interface MenuItem {
  name: string;
  link: string;
}

export interface MenuItems {
  heading: string;
  items: MenuItem[];
}

export const menuItemsUsers: MenuItems[] = [
  {
    heading: 'Skill Mapping',
    items: [
      {
        name: 'Nova Pesquisa',
        link: '/search',
      },
      {
        name: 'Resultado',
        link: '/result',
      },
      {
        name: 'Nova Pesquisa',
        link: '/search',
      },
      {
        name: 'Resultado',
        link: '/result',
      },
      {
        name: 'Nova Pesquisa',
        link: '/search',
      },
      {
        name: 'Resultado',
        link: '/result',
      },
      {
        name: 'Nova Pesquisa',
        link: '/search',
      },
      {
        name: 'Resultado',
        link: '/result',
      },
      {
        name: 'Nova Pesquisa',
        link: '/search',
      },
      {
        name: 'Resultado',
        link: '/result',
      },
      {
        name: 'Nova Pesquisa',
        link: '/search',
      },
      {
        name: 'Resultado',
        link: '/result',
      },
      {
        name: 'Nova Pesquisa',
        link: '/search',
      },
      {
        name: 'Resultado',
        link: '/result',
      },
      {
        name: 'Nova Pesquisa',
        link: '/search',
      },
      {
        name: 'Resultado',
        link: '/result',
      },
      {
        name: 'Nova Pesquisa',
        link: '/search',
      },
      {
        name: 'Resultado',
        link: '/result',
      },
      {
        name: 'Nova Pesquisa',
        link: '/search',
      },
      {
        name: 'Resultado',
        link: '/result',
      },
      {
        name: 'Nova Pesquisa',
        link: '/search',
      },
      {
        name: 'Resultado',
        link: '/result',
      },
      {
        name: 'Nova Pesquisa',
        link: '/search',
      },
      {
        name: 'Resultado',
        link: '/result',
      },
    ],
  },
];

export const menuItemsAdmin: MenuItems[] = [
  {
    heading: 'Skill Mapping',
    items: [
      {
        name: 'Meu Perfil',
        link: '/registration/profile',
      },
      {
        name: 'Dados Pessoais',
        link: '/registration/personal',
      },
      {
        name: 'Dados Complementares',
        link: '/registration/supplementary',
      },
      {
        name: 'Dados Eclesiásticos',
        link: '/registration/ecclesiastical',
      },
    ],
  },
  {
    heading: 'Gestão de Membros',
    items: [
      {
        name: 'Listagem de membros',
        link: '/admin/list',
      },
      {
        name: 'Estatisticas',
        link: '/admin/statistics',
      },
      {
        name: 'Dados',
        link: '/admin/data',
      },
    ],
  },
  {
    heading: 'Controle Financeiro',
    items: [
      {
        name: 'Cadastro',
        link: '/finance/register',
      },
      {
        name: 'Entradas',
        link: '/finance/gains',
      },
      {
        name: 'Saidas',
        link: '/finance/expenses',
      },
      {
        name: 'Dashboards',
        link: '/finance/dashboards',
      },
    ],
  },
];
