import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Grid {
    cells: [[String!]!]!
    code: String!
  }

  type Payment {
    id: ID!
    name: String!
    amount: Float!
    code: String!
    grid: [[String!]!]!
    createdAt: String!
  }
  
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    getGrid: Grid!
    getPayments: [Payment!]!
    me: User
  }

  type Mutation {
    generateGrid(bias: String): Grid!
    addPayment(name: String!, amount: Float!): Payment!
    register(username: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }

  type Subscription {
    gridUpdated: Grid!
    paymentAdded: Payment!
  }
`;

