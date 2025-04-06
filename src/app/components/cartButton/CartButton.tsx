"use client";

import { useCart } from "@/app/contexts/CartContext";
import styles from "./cartButton.module.css";

export default function CartButton() {
  const { items, openCart } = useCart();
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <button className={styles.cartButton} onClick={openCart}>
      <svg
        className={styles.cartIcon}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
      {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
    </button>
  );
}
