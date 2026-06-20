'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { PremiumLoginModal } from '@/components/PremiumLoginModal';

interface ModalContextType {
  isPremiumModalOpen: boolean;
  showPremiumModal: () => void;
  hidePremiumModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);

  const showPremiumModal = () => setIsPremiumModalOpen(true);
  const hidePremiumModal = () => setIsPremiumModalOpen(false);

  return (
    <ModalContext.Provider
      value={{ isPremiumModalOpen, showPremiumModal, hidePremiumModal }}
    >
      {children}
      <PremiumLoginModal />
    </ModalContext.Provider>
  );
}
