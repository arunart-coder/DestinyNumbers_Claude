import React, { createContext, useContext, useEffect, useState } from 'react';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin@123';
const SESSION_KEY = 'destiny_admin_session';

interface AdminUser {
  username: string;
}

interface AuthContextType {
  user: AdminUser | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = localStorage.getItem(SESSION_KEY);
    if (session === ADMIN_USERNAME) {
      setUser({ username: ADMIN_USERNAME });
    }
    setLoading(false);
  }, []);

  const signIn = async (username: string, password: string) => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem(SESSION_KEY, username);
      setUser({ username });
    } else {
      throw new Error('Invalid username or password.');
    }
  };

  const signOut = async () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin: !!user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
