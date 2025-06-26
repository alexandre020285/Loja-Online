import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

// Configuração do Supabase
const supabaseUrl = "https://jlkxpkfidbwgooanvjyt.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impsa3hwa2ZpZGJ3Z29vYW52anl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4OTAwOTUsImV4cCI6MjA2NjQ2NjA5NX0.YRqsskPESA-Xy-tDtPeP9KdAFhxJqjncbuOWXLN2IXI";

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email e senha são obrigatórios" },
        { status: 400 }
      );
    }

    // Buscar usuário
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    // Buscar endereço do usuário
    const { data: address, error: addressError } = await supabase
      .from('address')
      .select('*')
      .eq('userId', user.id)
      .single();

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });
    }

    // Remover a senha do objeto de resposta
    const { password: _, ...userWithoutPassword } = user;

    // Adicionar endereço ao usuário
    const userWithAddress = {
      ...userWithoutPassword,
      address: address || null,
    };

    return NextResponse.json(userWithAddress);
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return NextResponse.json({ error: "Erro ao fazer login" }, { status: 500 });
  }
}
