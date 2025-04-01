"use client";

import styles from "./mobileMenuButton.module.css";

interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

function MobileMenuButton({ isOpen, onClick }: MobileMenuButtonProps) {
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

export default MobileMenuButton;
