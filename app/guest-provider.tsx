'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type GuestContextType = {
  isGuest: boolean;
  setIsGuest: (isGuest: boolean) => void;
};

const GuestContext = createContext<GuestContextType | undefined>(undefined);

export function GuestProvider({ children }: { children: ReactNode }) {
  const [isGuest, setIsGuest] = useState(false);

  return (
    <GuestContext.Provider value={{ isGuest, setIsGuest }}>
      {children}
    </GuestContext.Provider>
  );
}

export function useGuest() {
  const context = useContext(GuestContext);
  if (context === undefined) {
    throw new Error('useGuest must be used within a GuestProvider');
  }
  return context;
}
