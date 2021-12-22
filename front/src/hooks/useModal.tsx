import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { MainModalTypes } from '../components/modal/types/MainModalTypes';
import { ProfileModalTypes } from '../components/modal/types/ProfileModalTypes';

interface ModalContextTypes {
  modalState: MainModalTypes | ProfileModalTypes | null;
  isOpen: boolean;
  openModal: (modal: MainModalTypes | ProfileModalTypes) => void;
  closeModal: () => void;
}

const context = createContext<ModalContextTypes>({
  modalState: null,
  isOpen: false,
  openModal: () => null,
  closeModal: () => null,
});

export const ModalProvider: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalState, setModalState] = useState<MainModalTypes | ProfileModalTypes | null>(null);

  const openModal = useCallback(
    (modal: MainModalTypes | ProfileModalTypes) => {
      setModalState(modal);
      setIsOpen(true);
    },
    [setModalState, setIsOpen],
  );

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const value = useMemo(
    () => ({
      modalState,
      isOpen,
      openModal,
      closeModal,
    }),
    [modalState, isOpen, openModal, closeModal],
  );

  return <context.Provider value={value}>{children}</context.Provider>;
};

export const useModal = (): ModalContextTypes => useContext(context);
