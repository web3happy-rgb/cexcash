import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { clearToken, login as loginRequest, me, register as registerRequest } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const storedToken = localStorage.getItem('cexcash_token');
        if (!storedToken) {
          setLoading(false);
          return;
        }
        const { user: profile } = await me();
        setUser(profile);
      } catch (err) {
        clearToken();
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  const handleAuthError = (err) => {
    setError(err.message);
    setTimeout(() => setError(null), 5000);
  };

  const register = useCallback(async (payload) => {
    try {
      const { user: profile } = await registerRequest(payload);
      setUser(profile);
      return profile;
    } catch (err) {
      handleAuthError(err);
      throw err;
    }
  }, []);

  const login = useCallback(async (payload) => {
    try {
      const { user: profile } = await loginRequest(payload);
      setUser(profile);
      return profile;
    } catch (err) {
      handleAuthError(err);
      throw err;
    }
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
  }, []);

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    register
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
