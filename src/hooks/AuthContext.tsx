import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

interface User {
  id: string;
  name: string;
  level: string;
}
interface Credentials {
  email: string;
  password: string;
}

interface AuthContextState {
  user: User;
  signIn(credentials: Credentials): Promise<void>;
  signOut(): void;
}

interface AuthState {
  token: string;
  user: User;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem('@FastCommerce:token');
    const user = localStorage.getItem('@FastCommerce:user');

    if (user && token) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/auth', {
      email,
      password,
    });

    const { user, token } = response.data;

    localStorage.setItem('@FastCommerce:token', token);
    localStorage.setItem('@FastCommerce:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@FastCommerce:token');
    localStorage.removeItem('@FastCommerce:user');

    setData({} as AuthState);
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};


function useAuth(): AuthContextState {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthPovider');
  }

  return context;
}

export { AuthProvider, useAuth };