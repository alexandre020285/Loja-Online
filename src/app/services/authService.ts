import bcrypt from "bcryptjs";
import crypto from "crypto";

export interface UserData {
  name: string;
  email: string;
  password: string;
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export const authService = {
  async register(userData: UserData) {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao registrar usuário");
      }

      return data;
    } catch (error) {
      console.error("Erro no registro:", error);
      throw error;
    }
  },

  async login(email: string, password: string) {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao fazer login");
      }

      return data;
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
  },

  async getUserById(id: string) {
    try {
      const response = await fetch(`/api/users/${id}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao buscar usuário");
      }

      return data;
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      throw error;
    }
  },
};
