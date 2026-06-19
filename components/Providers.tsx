'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { PremiumLoginModal } from '@/components/PremiumLoginModal';

type ModalContextType = {
  showPremiumModal: () => void;
  hidePremiumModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showPremiumModal = () => setIsModalOpen(true);
  const hidePremiumModal = () => setIsModalOpen(false);

  return (
    <ModalContext.Provider value={{ showPremiumModal, hidePremiumModal }}>
      {children}
      <PremiumLoginModal isOpen={isModalOpen} onClose={hidePremiumModal} />
    </ModalContext.Provider>
  );
};
