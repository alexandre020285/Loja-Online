import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    console.log("Iniciando busca de produtos...");
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
        console.log(`\nBuscando produtos da categoria: ${category}`);
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

        console.log(`Produtos encontrados em ${category}:`, products.length);
        console.log(
          `Primeiro produto de ${category}:`,
          products[0] ? JSON.stringify(products[0]) : "Nenhum produto"
        );

        const productsWithCategory = products.map((product) => ({
          ...product,
          category: category,
        }));

        allProducts = [...allProducts, ...productsWithCategory];
        console.log(`Total acumulado após ${category}:`, allProducts.length);
      } catch (error) {
        console.error(`ERRO na categoria ${category}:`, error.message);
        console.error("Stack trace:", error.stack);
      }
    }

    console.log("\nResumo final:");
    console.log("Total de produtos encontrados:", allProducts.length);
    console.log("Categorias presentes:", [
      ...new Set(allProducts.map((p) => p.category)),
    ]);
    console.log(
      "Quantidade por categoria:",
      Object.entries(
        allProducts.reduce((acc, p) => {
          acc[p.category] = (acc[p.category] || 0) + 1;
          return acc;
        }, {})
      )
    );

    if (allProducts.length === 0) {
      return NextResponse.json(
        { error: "Nenhum produto encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(allProducts);
  } catch (error) {
    console.error("Erro geral ao buscar produtos:", error);
    console.error("Stack trace:", error.stack);
    return NextResponse.json(
      { error: "Erro ao buscar produtos" },
      { status: 500 }
    );
  }
}
