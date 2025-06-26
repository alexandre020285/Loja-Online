import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import crypto from "crypto";

// Configuração do Supabase
const supabaseUrl = "https://jlkxpkfidbwgooanvjyt.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impsa3hwa2ZpZGJ3Z29vYW52anl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4OTAwOTUsImV4cCI6MjA2NjQ2NjA5NX0.YRqsskPESA-Xy-tDtPeP9KdAFhxJqjncbuOWXLN2IXI";

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    const { name, email, password, address } = await request.json();

    // Validações básicas
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Nome, email e senha são obrigatórios" },
        { status: 400 }
      );
    }

    if (!address || !address.street || !address.city || !address.state) {
      return NextResponse.json(
        { error: "Dados do endereço incompletos" },
        { status: 400 }
      );
    }

    // Verificar se o usuário já existe
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: "Este email já está cadastrado" },
        { status: 400 }
      );
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = crypto.randomUUID();

    // Criar usuário
    const { data: user, error: userError } = await supabase
      .from('users')
      .insert({
        id: userId,
        name,
        email,
        password: hashedPassword,
        updatedAt: new Date().toISOString(),
      })
      .select('id, name, email')
      .single();

    if (userError) {
      console.error("Erro ao criar usuário:", userError);
      return NextResponse.json(
        { error: "Erro ao criar usuário" },
        { status: 500 }
      );
    }

    // Criar endereço
    const { error: addressError } = await supabase
      .from('address')
      .insert({
        street: address.street,
        number: address.number || "",
        complement: address.complement || "",
        neighborhood: address.neighborhood || "",
        city: address.city,
        state: address.state,
        zipCode: address.cep || "",
        userId: userId,
      });

    if (addressError) {
      console.error("Erro ao criar endereço:", addressError);
      // Se falhar ao criar endereço, remover o usuário criado
      await supabase.from('users').delete().eq('id', userId);
      return NextResponse.json(
        { error: "Erro ao criar endereço" },
        { status: 500 }
      );
    }

    // Retornar usuário sem a senha
    return NextResponse.json(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Erro detalhado ao registrar usuário:", {
      message: error.message,
      stack: error.stack,
      cause: error.cause,
    });

    return NextResponse.json(
      { error: "Erro ao registrar usuário: " + error.message },
      { status: 500 }
    );
  }
}
