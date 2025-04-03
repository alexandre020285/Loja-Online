import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Buscar produtos de todas as categorias
    const categories = [
      "eletronics",
      "mensclothing",
      "mensshoes",
      "toys",
      "womensclothing",
      "womenshoes",
    ];

    const products = {};

    // Buscar produtos de cada categoria em paralelo
    await Promise.all(
      categories.map(async (category) => {
        products[category] = await prisma[category].findMany({
          select: {
            id: true,
            name: true,
            price: true,
            image: true,
          },
          take: 4, // Limitar a 4 produtos por categoria
        });
      })
    );

    return NextResponse.json(products);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar produtos" },
      { status: 500 }
    );
  }
}
