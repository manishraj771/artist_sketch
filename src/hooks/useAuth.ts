import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import type { User } from '../types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      // Decode token to get user info
      const payload = JSON.parse(atob(storedToken.split('.')[1]));
      setUser({
        id: payload.id,
        email: payload.email,
        isAdmin: payload.isAdmin,
      });
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    const { token } = await api.auth.login(email, password);
    localStorage.setItem('token', token);
    setToken(token);
    const payload = JSON.parse(atob(token.split('.')[1]));
    setUser({
      id: payload.id,
      email: payload.email,
      isAdmin: payload.isAdmin,
    });
  };

  const signUp = async (email: string, password: string) => {
    const { token } = await api.auth.register(email, password);
    localStorage.setItem('token', token);
    setToken(token);
    const payload = JSON.parse(atob(token.split('.')[1]));
    setUser({
      id: payload.id,
      email: payload.email,
      isAdmin: payload.isAdmin,
    });
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return { user, loading, token, signIn, signUp, signOut };
}