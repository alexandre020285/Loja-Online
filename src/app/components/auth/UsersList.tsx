"use client";

import { useState, useEffect } from "react";
import styles from "./usersList.module.css";

interface User {
  id: string;
  name: string;
  email: string;
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  } | null;
}

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/users");

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao buscar usuários");
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      setError(
        error instanceof Error ? error.message : "Erro ao buscar usuários"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId: string) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao deletar usuário");
      }

      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      setError(
        error instanceof Error ? error.message : "Erro ao deletar usuário"
      );
    }
  };

  if (loading) {
    return <div className={styles.loading}>Carregando...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h2>Usuários Cadastrados</h2>
      {users.length === 0 ? (
        <p className={styles.emptyMessage}>Nenhum usuário cadastrado</p>
      ) : (
        <div className={styles.usersList}>
          {users.map((user) => (
            <div key={user.id} className={styles.userCard}>
              <div className={styles.userInfo}>
                <h3>{user.name}</h3>
                <p>{user.email}</p>
                {user.address && (
                  <>
                    <p>
                      {user.address.street}, {user.address.number}
                      {user.address.complement &&
                        ` - ${user.address.complement}`}
                    </p>
                    <p>
                      {user.address.neighborhood}, {user.address.city} -{" "}
                      {user.address.state}
                    </p>
                    <p>CEP: {user.address.zipCode}</p>
                  </>
                )}
              </div>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(user.id)}
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
