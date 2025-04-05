import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const categories = [
      "eletronics",
      "mensclothing",
      "mensshoes",
      "toys",
      "womensclothing",
      "womenshoes",
    ];

    let allProducts = [];

    for (const category of categories) {
      try {
        const products = await prisma[category].findMany({
          select: {
            id: true,
            name: true,
            price: true,
            image: true,
            description: true,
            brand: true,
          },
        });

        const productsWithCategory = products.map((product) => ({
          ...product,
          category: category,
        }));

        allProducts = [...allProducts, ...productsWithCategory];
      } catch (error) {
        // Continua para a próxima categoria em caso de erro
        continue;
      }
    }

    if (allProducts.length === 0) {
      return NextResponse.json(
        { error: "Nenhum produto encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(allProducts);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar produtos" },
      { status: 500 }
    );
  }
}
