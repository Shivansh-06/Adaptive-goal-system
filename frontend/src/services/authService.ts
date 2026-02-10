import type { AuthResponse } from '../types/api';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    await delay(800); // Simulate network delay
    
    // Simulate validation
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // Accept any login for demo purposes
    return {
      user: {
        id: '1',
        name: 'Demo User',
        email: email,
      },
      token: 'mock-jwt-token-' + Date.now(),
    };
  },

  register: async (name: string, email: string, password: string): Promise<AuthResponse> => {
    await delay(800);

    if (!name || !email || !password) {
      throw new Error('All fields are required');
    }

    return {
      user: {
        id: Math.random().toString(36).substr(2, 9),
        name: name,
        email: email,
      },
      token: 'mock-jwt-token-' + Date.now(),
    };
  },

  logout: async (): Promise<void> => {
    await delay(200);
    localStorage.removeItem('token');
  }
};
