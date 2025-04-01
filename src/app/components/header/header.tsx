"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./header.module.css";
import MobileMenuButton from "../mobileMenuButton/mobileMenuButton";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Image src="/img/logo.png" alt="logo" width={100} height={100} />
          <div>
            <h1>Loja Online</h1>
            <p>A melhor loja online para você</p>
          </div>
        </div>
        <div className={styles.loginLinks}>
          <Link href="/cadastro">Cadastro</Link>
          <Link href="/login">Login</Link>
        </div>
      </div>

      <div className={styles.menu}>
        <MobileMenuButton isOpen={mobileMenuOpen} onClick={toggleMobileMenu} />

        <div
          className={`${styles.menuLinks} ${
            mobileMenuOpen ? styles.menuOpen : ""
          }`}
        >
          <Link href="/mensclothing">Roupas Masculinas</Link>
          <Link href="/mensShoes">Calçados Masculinos</Link>
          <Link href="/womensclothing">Roupas Femininas</Link>
          <Link href="/womensShoes">Calçados Femininos</Link>
          <Link href="/eletronics">Eletrônicos</Link>
          <Link href="/toys">Brinquedos</Link>
        </div>
        <div className={styles.cartLinks}>
          <Link href="/cart">
            <Image src="/img/cart.png" alt="cart" width={24} height={24} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
