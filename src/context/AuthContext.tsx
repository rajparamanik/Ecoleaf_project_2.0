import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Sync with both legacy and new user keys for compatibility
    const storedUser = localStorage.getItem('ecoLeafUser') || localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);

    // Listen for user-sync events (login/logout from other tabs or components)
    const syncUser = () => {
      const u = localStorage.getItem('ecoLeafUser') || localStorage.getItem('user');
      setUser(u ? JSON.parse(u) : null);
    };
    window.addEventListener('storage', syncUser);
    window.addEventListener('user-sync', syncUser);
    window.addEventListener('user-login', syncUser);
    window.addEventListener('focus', syncUser);
    return () => {
      window.removeEventListener('storage', syncUser);
      window.removeEventListener('user-sync', syncUser);
      window.removeEventListener('user-login', syncUser);
      window.removeEventListener('focus', syncUser);
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const userData = {
        id: '1',
        name: 'John Doe',
        email
      };
      setUser(userData);
      localStorage.setItem('ecoLeafUser', JSON.stringify(userData));
      localStorage.setItem('user', JSON.stringify(userData));
      window.dispatchEvent(new Event('user-login'));
      window.dispatchEvent(new Event('user-sync'));
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const userData = {
        id: '1',
        name,
        email
      };
      setUser(userData);
      localStorage.setItem('ecoLeafUser', JSON.stringify(userData));
      localStorage.setItem('user', JSON.stringify(userData));
      window.dispatchEvent(new Event('user-login'));
      window.dispatchEvent(new Event('user-sync'));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ecoLeafUser');
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('user-sync'));
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading, 
      login, 
      register, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}