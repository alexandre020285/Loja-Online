"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { authService, UserData } from "../services/authService";
import { toast } from "react-toastify";

interface AuthContextType {
  currentUser: {
    id: string;
    name: string;
    email: string;
  } | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: UserData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] =
    useState<AuthContextType["currentUser"]>(null);

  useEffect(() => {
    // Verifica se há um usuário logado no localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const user = await authService.login(email, password);
      setCurrentUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Login realizado com sucesso!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao fazer login"
      );
      throw error;
    }
  };

  const register = async (userData: UserData) => {
    try {
      const user = await authService.register(userData);
      setCurrentUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Cadastro realizado com sucesso!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao fazer cadastro"
      );
      throw error;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
    toast.success("Logout realizado com sucesso!");
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
