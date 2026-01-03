import { uniqueId } from 'lodash';
import {
  IconPackage,
  IconShoppingCart,
  IconPlus,
  IconLayoutDashboard,
} from '@tabler/icons-react';

const Menuitems = [
  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },
  {
    id: uniqueId(),
    title: 'Manage Products',
    icon: IconPackage,
    href: '/products',
  },
  {
    id: uniqueId(),
    title: 'Add Product',
    icon: IconPlus,
    href: '/products/add',
  },
  {
    id: uniqueId(),
    title: 'View Orders',
    icon: IconShoppingCart,
    href: '/orders',
  },
];

export default Menuitems;
