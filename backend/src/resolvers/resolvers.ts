import { PubSub } from 'graphql-subscriptions';
import { AuthenticationError } from 'apollo-server-express';

import { generateGrid, generateCode } from '../services/gridService';
import { addPayment, getPayments } from '../services/paymentService';
import { getUserById, login, register } from '../services/authService';

const pubsub = new PubSub();

export const resolvers = {
  Query: {
    getGrid: () => {
      const grid = generateGrid();
      const code = generateCode(grid);
      return { cells: grid, code };
    },
    getPayments: (_, __, { user }) => {
      if (!user) throw new AuthenticationError('You must be logged in to view payments');
  
      return getPayments(user.id);
    },
    me: (_, __, { user }) => {
      if (!user) return null;

      return getUserById(user.id);
    },
  },
  Mutation: {
    generateGrid: (_: unknown, { bias }: { bias?: string }) => {
      const grid = generateGrid(bias);

      const code = generateCode(grid);

      const result = { cells: grid, code };

      pubsub.publish('GRID_UPDATED', { gridUpdated: result });

      return result;
    },
    addPayment: async (
      _: unknown,
      { name, amount }: { name: string; amount: number },
      { user }
    ) => {
      if (!user) throw new AuthenticationError('You must be logged in to view payments');

      const payment = await addPayment(user.id, name, amount);

      pubsub.publish('PAYMENT_ADDED', { paymentAdded: payment });

      return payment;
    },
    register: (_, args) => register(args),
    login: (_, args) => login(args),
  },
  Subscription: {
    gridUpdated: {
      subscribe: () => pubsub.asyncIterator(['GRID_UPDATED']),
    },
    paymentAdded: {
      subscribe: () => pubsub.asyncIterator(['PAYMENT_ADDED']),
    },
  },
};
