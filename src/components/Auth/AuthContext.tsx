import React, { createContext, useState, useEffect, useContext } from 'react';

type User = {
  id: string;
  username: string;
  email: string;
  avatar?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // On mount, try to fetch the current user from the backend
    const fetchUser = async () => {
      try {
        setError(null);
        const res = await fetch('/api/user.php', {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (err) {
        setUser(null);
        setIsAuthenticated(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setError(null);
      const res = await fetch('/api/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const errData = await res.json();
        setError(errData.message || 'Invalid credentials');
        return false;
      }
      const data = await res.json();
      setUser(data);
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
      return false;
    }
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    try {
      setError(null);
      const res = await fetch('/api/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, email, password }),
      });
      if (!res.ok) {
        const errData = await res.json();
        setError(errData.message || 'Registration failed');
        return false;
      }
      const data = await res.json();
      setUser(data);
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during registration');
      return false;
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/logout.php', {
        method: 'POST',
        credentials: 'include',
      });
    } catch {}
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};
