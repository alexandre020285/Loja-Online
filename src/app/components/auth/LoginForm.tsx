"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      router.push("/");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erro ao fazer login. Tente novamente."
      );
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <Link href="/" className={styles.backButton}>
          ← Voltar para a página inicial
        </Link>
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.submitButton}>
            Entrar
          </button>
        </form>

        <p className={styles.registerLink}>
          Não tem uma conta? <Link href="/cadastro">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
}
