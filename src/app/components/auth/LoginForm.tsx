"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";
import styles from "./auth.module.css";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const { login, users, deleteUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const user = login(email, password);

      if (user) {
        console.log("Login realizado com sucesso:", user);

        // Aguardar um pouco para garantir que o estado foi atualizado
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Verificar se o login foi bem-sucedido
        const currentUser = localStorage.getItem("currentUser");
        if (currentUser) {
          console.log(
            "Usuário confirmado no localStorage:",
            JSON.parse(currentUser)
          );
          window.location.href = "/"; // Usando window.location para forçar um refresh completo
        } else {
          setError("Erro ao fazer login. Tente novamente.");
        }
      } else {
        setError("E-mail ou senha inválidos");
      }
    } catch (err) {
      console.error("Erro durante o login:", err);
      setError("Erro ao fazer login. Tente novamente.");
    }
  };

  const handleDeleteUser = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      deleteUser(id);
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

      <div className={styles.usersContainer}>
        <h2>Usuários Cadastrados</h2>
        {mounted && (
          <>
            {users.length === 0 ? (
              <p className={styles.noUsers}>Nenhum usuário cadastrado</p>
            ) : (
              <ul className={styles.usersList}>
                {users.map((user) => (
                  <li key={user.id} className={styles.userItem}>
                    <div className={styles.userInfo}>
                      <strong>{user.name}</strong>
                      <p>{user.email}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className={styles.deleteButton}
                      title="Excluir usuário"
                    >
                      🗑️
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}
