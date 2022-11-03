import React from 'react';

const HomePage = React.lazy(() => import('../containers/Home'));
const ProductPage = React.lazy(() => import('../containers/Products'));
const ProductSinglePage = React.lazy(() => import('../containers/ProductSingle'));
const OrderPage = React.lazy(() => import('../containers/Orders'));
const OrderSinglePage = React.lazy(() => import('../containers/OrderSingle'));
const UserPage = React.lazy(() => import('../containers/Users'));

const routes = [
  {
    path: '/',
    name: 'Home Page',
    component: HomePage,
  },
  {
    path: '/products',
    name: 'Products Page',
    component: ProductPage,
  },
  {
    path: '/products/:id',
    name: 'Single Product Page',
    component: ProductSinglePage,
  },
  {
    path: '/orders',
    name: 'Orders Page',
    component: OrderPage,
  },
  {
    path: '/orders/:id',
    name: 'Single Order Page',
    component: OrderSinglePage,
  },
  {
    path: '/users',
    name: 'Users Page',
    component: UserPage,
  },
];

export default routes;
