export const menuData = [
  {
    label: 'Buy properties',
    href: '/buy',
  },
  {
    label: 'Rent homes',
    href: '/rent',
  },
  {
    label: 'Sell',
    href: '/sell',
  },
  { label: 'News & Insights', href: '/news' },
  {
    label: 'Mortgage',
    href: '/mortgage',
    children: [
      {
        heading: 'Mortgage rates',
        submenu: [
          { label: 'Lorem ipsum dolor', href: '#' },
          { label: 'Repellat corporis?', href: '#' },
          { label: 'Dolor sit consectetur dolor impedit', href: '#' },
          { label: 'Ratione recusandae', href: '#' },
          { label: 'Dolor sit consectetur', href: '#' },
          { label: 'Ratione recusandae', href: '#' },
        ],
      },
      {
        heading: 'Calculators',
        submenu: [
          { label: 'Dolor sit consectetur', href: '#' },
          { label: 'Ratione recusandae dolor impedit', href: '#' },
          { label: 'Dolor sit consectetur', href: '#' },
          { label: 'Ratione recusandae', href: '#' },
        ],
      },
      {
        heading: 'Financial advice',
        submenu: [
          { label: 'Lorem ipsum dolor', href: '#' },
          { label: 'Repellat corporis?', href: '#' },
          { label: 'Dolor sit consectetur', href: '#' },
          {
            label: 'Ratione recusandae dolor impedit corporis',
            href: '#',
          },
          { label: 'Dolor sit consectetur', href: '#' },
          { label: 'Ratione recusandae', href: '#' },
        ],
      },
    ],
  },
];
