"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import LoginForm from "@/app/components/auth/LoginForm";
import UsersList from "@/app/components/auth/UsersList";
import styles from "./login.module.css";

export default function LoginPage() {
  const { user, login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <div className={styles.container}>
      <div className={styles.loginSection}>
        <h1 className={styles.title}>Login</h1>
        {error && <p className={styles.error}>{error}</p>}
        <LoginForm />
        <p className={styles.registerLink}>
          Não tem uma conta? <Link href="/register">Registre-se</Link>
        </p>
      </div>
      <div className={styles.usersSection}>
        <UsersList />
      </div>
    </div>
  );
}
