"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./header.module.css";
import { useCart } from "../../contexts/CartContext";

export default function Header() {
  const { cart } = useCart();

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Logo da Loja"
            width={150}
            height={50}
            priority
          />
        </Link>
      </div>

      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink}>
          Início
        </Link>
        <Link href="/produtos" className={styles.navLink}>
          Produtos
        </Link>
        <Link href="/sobre" className={styles.navLink}>
          Sobre
        </Link>
        <Link href="/contato" className={styles.navLink}>
          Contato
        </Link>
      </nav>

      <div className={styles.cartContainer}>
        <Link href="/cart" className={styles.cartLink}>
          <div className={styles.cartIcon}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM7 17C5.89543 17 5 17.8954 5 19C5 20.1046 5.89543 21 7 21C8.10457 21 9 20.1046 9 19C9 17.8954 8.10457 17 7 17Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {cartItemCount > 0 && (
              <span className={styles.cartCount}>{cartItemCount}</span>
            )}
          </div>
        </Link>
      </div>
    </header>
  );
}
