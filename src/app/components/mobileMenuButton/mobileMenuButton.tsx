"use client";

import styles from "./mobileMenuButton.module.css";

type Props = {
  isOpen: boolean;
  onClick: () => void;
};

export default function MobileMenuButton({ isOpen, onClick }: Props) {
  return (
    <button
      className={styles.mobileMenuButton}
      onClick={onClick}
      aria-label="Menu"
    >
      {isOpen ? "✕" : "☰"}
    </button>
  );
}
