"use client";

import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Link from "next/link";
import styles from "../components/auth/register.module.css";
import { useRouter } from "next/navigation";
import UsersList from "../components/auth/UsersList";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState({
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("As senhas não coincidem");
      return;
    }

    try {
      await register({
        name,
        email,
        password,
        address,
      });
      router.push("/");
    } catch (error) {
      console.error("Erro ao registrar:", error);
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backButton}>
        ← Voltar para a página inicial
      </Link>
      <h1 className={styles.title}>Criar Conta</h1>
      <div className={styles.content}>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
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
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">Confirmar Senha</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div className={styles.addressGroup}>
              <h2>Endereço</h2>
              <div className={styles.formGroup}>
                <label htmlFor="street">Rua</label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={address.street}
                  onChange={handleAddressChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="number">Número</label>
                <input
                  type="text"
                  id="number"
                  name="number"
                  value={address.number}
                  onChange={handleAddressChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="complement">Complemento</label>
                <input
                  type="text"
                  id="complement"
                  name="complement"
                  value={address.complement}
                  onChange={handleAddressChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="neighborhood">Bairro</label>
                <input
                  type="text"
                  id="neighborhood"
                  name="neighborhood"
                  value={address.neighborhood}
                  onChange={handleAddressChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="city">Cidade</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={address.city}
                  onChange={handleAddressChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="state">Estado</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={address.state}
                  onChange={handleAddressChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="zipCode">CEP</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={address.zipCode}
                  onChange={handleAddressChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className={styles.submitButton}>
              Criar Conta
            </button>
          </form>
          <p className={styles.loginLink}>
            Já tem uma conta? <Link href="/login">Faça login</Link>
          </p>
        </div>
        <UsersList />
      </div>
    </div>
  );
}
