import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { name, email, password, address } = await request.json();

    // Verificar se o usuário já existe
    const existingUser = await prisma.users.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Usuário já existe" }, { status: 400 });
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
    const userAddress = await prisma.address.create({
      data: {
        street: address.street,
        number: address.number,
        complement: address.complement || "",
        neighborhood: address.neighborhood,
        city: address.city,
        state: address.state,
        zipCode: address.zipCode,
        userId: userId,
      },
    });

    return NextResponse.json(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        address: userAddress,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    return NextResponse.json(
      { error: "Erro ao registrar usuário" },
      { status: 500 }
    );
  }
}
