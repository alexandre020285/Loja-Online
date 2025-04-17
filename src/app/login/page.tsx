"use client";

import { useState } from "react";
import Link from "next/link";
import LoginForm from "@/app/components/auth/LoginForm";
import UsersList from "@/app/components/auth/UsersList";
import styles from "./login.module.css";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backButton}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 12H5M5 12L12 19M5 12L12 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Voltar a tela inicial
      </Link>
      <h1 className={styles.title}>Login</h1>
      <div className={styles.content}>
        <div className={styles.formContainer}>
          {error && <p className={styles.error}>{error}</p>}
          <LoginForm />
          <p className={styles.registerLink}>
            Não tem uma conta? <Link href="/register">Cadastre-se</Link>
          </p>
        </div>
        <div className={styles.usersSection}>
          <h2>Usuários Cadastrados</h2>
          <UsersList />
        </div>
      </div>
    </div>
  );
}
