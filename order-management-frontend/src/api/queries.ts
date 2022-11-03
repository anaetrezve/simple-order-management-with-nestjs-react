import { gql } from '@apollo/client';
import { Order, Product, User } from './fragments';

export const GET_ALL_PRODUCTS_QUERY = gql`
  query products {
    products {
      ...ProductData
    }
  }
  ${Product.fragments.ProductData}
`;

export const GET_ALL_ORDERS_QUERY = gql`
  query orders {
    orders {
      ...OrderData
    }
  }
  ${Order.fragments.OrderData}
`;

export const GET_ALL_USERS_QUERY = gql`
  query users {
    users {
      ...UserData
    }
  }
  ${User.fragments.UserData}
`;

export const GET_USER_BY_ID_QUERY = gql`
  query user($_id: ID!) {
    user(_id: $_id) {
      ...UserData
    }
  }
  ${User.fragments.UserData}
`;

export const GET_ORDER_BY_ID_QUERY = gql`
  query user($_id: ID!) {
    order(_id: $_id) {
      ...OrderData
    }
  }
  ${Order.fragments.OrderData}
`;

export const GET_PRODUCT_BY_ID_QUERY = gql`
  query product($_id: ID!) {
    product(_id: $_id) {
      ...ProductData
    }
  }
  ${Product.fragments.ProductData}
`;
