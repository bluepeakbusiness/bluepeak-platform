import { createContext, useEffect, useMemo, useState } from 'react';
import { authApi } from '../services/authApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('bluepeak_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const profile = await authApi.getProfile();
        setUser(profile?.data || profile);
      } catch {
        localStorage.removeItem('bluepeak_token');
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    bootstrap();
  }, [token]);

  const login = async (credentials) => {
    const result = await authApi.login(credentials);
    const authToken = result?.data?.token || result?.token;
    const authUser = result?.data?.user || result?.user;

    if (authToken) {
      localStorage.setItem('bluepeak_token', authToken);
      setToken(authToken);
    }

    setUser(authUser || null);
    return result;
  };

  const logout = () => {
    localStorage.removeItem('bluepeak_token');
    setToken(null);
    setUser(null);
  };

  const value = useMemo(() => ({ user, token, loading, login, logout, setUser }), [user, token, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
