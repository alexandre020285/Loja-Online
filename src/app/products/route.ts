import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Criar uma única instância do PrismaClient
const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    console.log("Iniciando busca de produtos...");
    console.log("Categoria:", category);

    let products = [];

    if (category) {
      // Verifica se a categoria é válida
      const validCategories = [
        "eletronics",
        "mensclothing",
        "mensshoes",
        "toys",
        "womensclothing",
        "womenshoes",
      ];

      if (!validCategories.includes(category)) {
        return NextResponse.json(
          { error: "Categoria não encontrada" },
          { status: 404 }
        );
      }

      console.log(`Buscando produtos da categoria ${category}...`);
      const categoryProducts = await prisma[category].findMany();
      console.log(
        `Encontrados ${categoryProducts.length} produtos em ${category}`
      );

      // Adiciona a categoria aos produtos
      products = categoryProducts.map((product) => ({
        ...product,
        category: category,
      }));
    } else {
      // Se não houver categoria, busca todos os produtos
      console.log("Buscando todos os produtos...");
      const [
        eletronics,
        mensclothing,
        mensshoes,
        toys,
        womensclothing,
        womenshoes,
      ] = await Promise.all([
        prisma.eletronics.findMany(),
        prisma.mensclothing.findMany(),
        prisma.mensshoes.findMany(),
        prisma.toys.findMany(),
        prisma.womensclothing.findMany(),
        prisma.womenshoes.findMany(),
      ]);

      products = [
        ...eletronics.map((p) => ({ ...p, category: "eletronics" })),
        ...mensclothing.map((p) => ({ ...p, category: "mensclothing" })),
        ...mensshoes.map((p) => ({ ...p, category: "mensshoes" })),
        ...toys.map((p) => ({ ...p, category: "toys" })),
        ...womensclothing.map((p) => ({ ...p, category: "womensclothing" })),
        ...womenshoes.map((p) => ({ ...p, category: "womenshoes" })),
      ];

      console.log(`Total de produtos encontrados: ${products.length}`);
    }

    // Formata os produtos para o frontend
    const formattedProducts = products.map((product) => ({
      id: product.id.toString(),
      name: product.name,
      price: Number(product.price),
      description: product.description,
      image: product.image,
      brand: product.brand,
      sizes: product.sizes || [],
      category: product.category,
      stock: 10, // Valor padrão
    }));

    console.log(`Total de produtos formatados: ${formattedProducts.length}`);

    return NextResponse.json(formattedProducts);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar produtos" },
      { status: 500 }
    );
  }
}
