"use client";

import { useWallet } from "@/app/contexts/WalletContext";
import styles from "./walletButton.module.css";

export default function WalletButton() {
  const { openWallet, balance } = useWallet();

  return (
    <button className={styles.walletButton} onClick={openWallet}>
      <svg className={styles.walletIcon} viewBox="0 0 24 24">
        <path d="M19 5V19H5V5H19ZM19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z" />
        <path d="M15 9C15 10.66 13.66 12 12 12C10.34 12 9 10.66 9 9C9 7.34 10.34 6 12 6C13.66 6 15 7.34 15 9Z" />
        <path d="M6 17.47C6 15.97 8.31 14.5 12 14.5C15.69 14.5 18 15.97 18 17.47V18H6V17.47Z" />
      </svg>
      <span className={styles.balance}>R$ {balance.toFixed(2)}</span>
    </button>
  );
}
