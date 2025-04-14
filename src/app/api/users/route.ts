import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Teste simples: buscar apenas os usuários sem relacionamentos
    const users = await prisma.users.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      }
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return NextResponse.json(
      { error: "Erro ao buscar usuários" },
      { status: 500 }
    );
  }
}
