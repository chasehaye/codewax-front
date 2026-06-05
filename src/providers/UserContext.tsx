'use client';

import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

import { getMe, logout } from '@/src/lib/api/auth';

export type User = {
  user_email: string;
  user_name: string;
  is_admin: boolean;
};

type UserContextType = {
  user: User | null;
  admin: boolean;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logoutUser: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const refreshUser = async () => {
    setLoading(true);
    try {
      const data = await getMe();
      if (data) setUser(data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function initAuth() {
      try {
        const data = await getMe();

        if (data) {
          setUser(data);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    initAuth();
  }, []);

  const logoutUser = async () => {
    try {
      await logout();
    } finally {
      setUser(null);
      router.push('/');
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        admin: user?.is_admin ?? false,
        loading,
        logoutUser,
        refreshUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }

  return context;
}
