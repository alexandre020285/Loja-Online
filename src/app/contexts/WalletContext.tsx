"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface WalletContextType {
  isOpen: boolean;
  balance: number;
  openWallet: () => void;
  closeWallet: () => void;
  addFunds: (amount: number) => void;
  removeFunds: (amount: number) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [balance, setBalance] = useState(1000); // Saldo inicial de R$ 1000

  const openWallet = () => setIsOpen(true);
  const closeWallet = () => setIsOpen(false);

  const addFunds = (amount: number) => {
    setBalance((prev) => prev + amount);
  };

  const removeFunds = (amount: number) => {
    setBalance((prev) => Math.max(0, prev - amount));
  };

  return (
    <WalletContext.Provider
      value={{
        isOpen,
        balance,
        openWallet,
        closeWallet,
        addFunds,
        removeFunds,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
