import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (request) => {
  try {
    // Buscar produtos de todas as categorias
    const products = {
      eletronics: await prisma.eletronics.findMany(),
      mensclothing: await prisma.mensclothing.findMany(),
      mensshoes: await prisma.mensshoes.findMany(),
      toys: await prisma.toys.findMany(),
      womensclothing: await prisma.womensclothing.findMany(),
      womenshoes: await prisma.womenshoes.findMany(),
    };
    return NextResponse.json(products);

  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar produtos" },
      { status: 500 }
    );
  }
};
