'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const NavContext = createContext<{
  isOpen: boolean;
  toggle: () => void;
} | null>(null);

export function NavProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <NavContext.Provider value={{ isOpen, toggle }}>
      {children}
    </NavContext.Provider>
  );
}

export function useNav() {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error('useNav must be used within NavProvider');
  return ctx;
}
