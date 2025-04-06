"use client";

import { useWallet } from "@/app/contexts/WalletContext";
import styles from "./walletModal.module.css";

export default function WalletModal() {
  const { isOpen, balance, closeWallet, addFunds } = useWallet();

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={closeWallet}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={closeWallet}>
          ×
        </button>
        <h2 className={styles.title}>Minha Carteira</h2>
        <div className={styles.balance}>
          <span>Saldo Atual:</span>
          <span className={styles.amount}>R$ {balance.toFixed(2)}</span>
        </div>
        <div className={styles.addFunds}>
          <h3>Adicionar Fundos</h3>
          <div className={styles.buttons}>
            <button onClick={() => addFunds(50)}>+ R$ 50,00</button>
            <button onClick={() => addFunds(100)}>+ R$ 100,00</button>
            <button onClick={() => addFunds(200)}>+ R$ 200,00</button>
          </div>
        </div>
      </div>
    </div>
  );
}
