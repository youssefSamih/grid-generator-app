import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';

import { User } from '../models/User';

export const generateToken = (user: { id: string; }) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1d' });
};

export const getUser = async (token: string) => {
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    return await User.findById(decoded.id);
  } catch (error) {
    throw new AuthenticationError('Invalid/Expired token');
  }
};
