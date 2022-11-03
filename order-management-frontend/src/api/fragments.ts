import { gql } from '@apollo/client';

export const Product = {
  fragments: {
    ProductData: gql`
      fragment ProductData on Product {
        _id
        code
        title
        description
        category
        price
      }
    `,
  },
};

export const User = {
  fragments: {
    UserData: gql`
      fragment UserData on User {
        _id
        name
        username
        email
        role
      }
    `,
  },
};

export const OrderHistory = {
  fragments: {
    OrderHistoryData: gql`
      fragment OrderHistoryData on OrderHistory {
        status
        changedAt
      }
    `,
  },
};

export const Order = {
  fragments: {
    OrderData: gql`
      fragment OrderData on Order {
        _id
        status
        total
        products {
          product {
            ...ProductData
          }
          quantity
        }
        orderBy {
          ...UserData
        }
        assignee {
          ...UserData
        }
        history {
          ...OrderHistoryData
        }
        createdAt
        updatedAt
      }

      ${Product.fragments.ProductData}
      ${User.fragments.UserData}
      ${OrderHistory.fragments.OrderHistoryData}
    `,
  },
};

export const OrderedProduct = {
  fragments: {
    OrderedProductData: gql`
      fragment OrderedProductData on OrderedProduct {
        product {
          ...ProductData
        }
        quantity
      }

      ${Product.fragments.ProductData}
    `,
  },
};
