import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const prisma = new PrismaClient();

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
    const existingUser = await prisma.users.findUnique({
      where: { email },
    });

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
    const user = await prisma.users.create({
      data: {
        id: userId,
        name,
        email,
        password: hashedPassword,
        updatedAt: new Date(),
      },
    });

    // Criar endereço
    await prisma.address.create({
      data: {
        street: address.street,
        number: address.number || "",
        complement: address.complement || "",
        neighborhood: address.neighborhood || "",
        city: address.city,
        state: address.state,
        zipCode: address.cep || "", // Note a mudança de zipCode para cep
        userId: userId,
      },
    });

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

    // Verificar se é um erro do Prisma
    if (error?.code === "P2002") {
      return NextResponse.json(
        { error: "Este email já está cadastrado" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Erro ao registrar usuário: " + error.message },
      { status: 500 }
    );
  }
}
