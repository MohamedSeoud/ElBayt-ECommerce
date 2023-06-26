import { NbMenuItem } from '@nebular/theme';

export const APP_MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Product Departments',
    group: true,
  },
  {
    title: 'Clothes',
    icon: 'grid-outline',
    children: [
      {
        title: 'Clothes Departments',
        link: 'Clothes/Departments',
      },
      {
        title: 'Clothes Brands',
        link: 'Clothes/Brands',
      },
      {
        title: 'Clothes Sizes',
        link: 'Clothes/Sizes',
      },
      {
        title: 'Clothes Types',
        link: 'Clothes/Types',
      },
      {
        title: 'Clothes Categories',
        link: 'Clothes/Categories',
      },
      {
        title: 'Clothes',
        link: 'Clothes/Products',
      },

    ],
  },
  {
    title: 'General',
    icon: 'grid-outline',
    children: [
      {
        title: 'Colors',
        link: 'General/Colors',
      }

    ],
  },
  {
    title: 'Orders',
    icon: 'grid-outline',
    children: [
      {
        title: 'All Order',
        link: 'Orders',
      },

    ],
  },
  {
    title: 'Administration',
    group: true,
  },
  {
    title: 'Admins',
    icon: 'grid-outline',
    children: [
      {
        title: 'Register User',
        link: 'Admin/Register',
      }

    ],
  },
];
