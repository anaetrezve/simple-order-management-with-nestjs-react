import { gql } from '@apollo/client';
import { Order, Product, User } from './fragments';

export const CREATE_PRODUCT_MUTATION = gql`
  mutation createProduct($createProductInput: CreateProductInput!) {
    createProduct(createProductInput: $createProductInput) {
      ...ProductData
    }
  }
  ${Product.fragments.ProductData}
`;

export const CREATE_USER_MUTATION = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      ...UserData
    }
  }
  ${User.fragments.UserData}
`;

export const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($createOrderInput: CreateOrderInput!) {
    createUser(createOrderInput: $createOrderInput) {
      ...UserData
    }
  }
  ${Order.fragments.OrderData}
`;

export const UPDATE_ORDER_MUTATION = gql`
  mutation updateOrder($updateOrderInput: UpdateOrderInput!) {
    updateOrder(updateOrderInput: $updateOrderInput) {
      ...OrderData
    }
  }
  ${Order.fragments.OrderData}
`;

export const UPDATE_PRODUCT_MUTATION = gql`
  mutation updateProduct($updateProductInput: UpdateProductInput!) {
    updateProduct(updateProductInput: $updateProductInput) {
      ...ProductData
    }
  }
  ${Product.fragments.ProductData}
`;

export const UPDATE_USER_MUTATION = gql`
  mutation updateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      ...UserData
    }
  }
  ${User.fragments.UserData}
`;

// removeProduct(_id: ID!): Product
// removeUser(_id: ID!): User
// removeOrder(_id: ID!): Order
