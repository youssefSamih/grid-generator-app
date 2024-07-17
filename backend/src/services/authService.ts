import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

import { User } from "../models/User";

export async function getUserById(userId: string) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    return {
      id: user._id,
      username: user.username,
      email: user.email,
    };
  } catch (error) {
    console.error('Error fetching user:', error);

    throw new Error('Failed to fetch user');
  }
}

export async function register({ username, email, password }: { username: string; email: string; password: string }) {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
  
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Create new user
    const user = new User({ username, email, password });
    
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    return {
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    };
  } catch (error) {
    console.error('Error registering user:', error);
  
    throw new Error('Failed to register user');
  }
}

export async function login({ email, password }) {
  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    return {
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    };
  } catch (error) {
    console.error('Error logging in user:', error);
    
    throw new Error('Failed to log in user');
  }
}
