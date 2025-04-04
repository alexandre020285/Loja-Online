"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./header.module.css";

function Header() {
  return (
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
  );
}

export default Header;
