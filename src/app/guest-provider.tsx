 'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

const GuestContext = createContext<{ guestId: string | null; setGuestId: (id: string | null) => void } | undefined>(undefined);

export function GuestProvider({ children }: { children: ReactNode }) {
  const [guestId, setGuestId] = useState<string | null>(null);

  return (
    <GuestContext.Provider value={{ guestId, setGuestId }}>
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
 