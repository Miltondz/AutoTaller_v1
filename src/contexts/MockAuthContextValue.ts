import { createContext } from 'react';
import { IMockAuthContextType } from './MockAuthContext';

export const MockAuthContextValue: IMockAuthContextType = {
  user: null,
  loading: false,
  signIn: async (email, password) => {
    console.log(`Mock signIn called with email: ${email}, password: ${password}`);
    // Simulate a successful sign-in for demo purposes
    if (email === 'test@example.com' && password === 'password') {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Invalid mock credentials'));
  },
  signOut: async () => {
    console.log('Mock signOut called');
    return Promise.resolve();
  },
};