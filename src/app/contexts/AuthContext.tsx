"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  address: {
    cep: string;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
  };
}

interface AuthContextType {
  currentUser: User | null;
  users: User[];
  register: (user: Omit<User, "id">) => void;
  login: (email: string, password: string) => User | null;
  logout: () => void;
  deleteUser: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);

  // Carregar dados do localStorage na montagem inicial
  useEffect(() => {
    try {
      const storedUsers = localStorage.getItem("users");
      const storedCurrentUser = localStorage.getItem("currentUser");

      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      }

      if (storedCurrentUser) {
        setCurrentUser(JSON.parse(storedCurrentUser));
      }
    } catch (error) {
      console.error("Erro ao carregar dados do localStorage:", error);
    } finally {
      setMounted(true);
    }
  }, []);

  // Salvar usuários no localStorage quando mudar
  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem("users", JSON.stringify(users));
      } catch (error) {
        console.error("Erro ao salvar usuários no localStorage:", error);
      }
    }
  }, [users, mounted]);

  // Salvar usuário atual no localStorage quando mudar
  useEffect(() => {
    if (mounted) {
      try {
        if (currentUser) {
          localStorage.setItem("currentUser", JSON.stringify(currentUser));
          console.log("Usuário atual salvo:", currentUser);
        } else {
          localStorage.removeItem("currentUser");
          console.log("Usuário atual removido");
        }
      } catch (error) {
        console.error("Erro ao salvar usuário atual no localStorage:", error);
      }
    }
  }, [currentUser, mounted]);

  const register = (userData: Omit<User, "id">) => {
    const newUser = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9),
    };
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const login = (email: string, password: string) => {
    console.log("Tentando fazer login com:", email);
    console.log("Usuários disponíveis:", users);

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      console.log("Usuário encontrado, fazendo login:", user);
      setCurrentUser(user);
      return user;
    }

    console.log("Usuário não encontrado");
    return null;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const deleteUser = (id: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    if (currentUser?.id === id) {
      setCurrentUser(null);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        register,
        login,
        logout,
        deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
