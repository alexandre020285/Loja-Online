import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface BaseProduct {
  id: number;
  name: string;
  price: any; // Decimal do Prisma
  description: string;
  image: string;
  brand: string;
  sizes: string;
}

interface FormattedProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  stock: number;
  brand: string;
  sizes: string[];
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    let products: (BaseProduct & { category?: string })[] = [];

    if (category) {
      // Busca produtos por categoria
      switch (category) {
        case "eletronics":
          products = await prisma.eletronics.findMany();
          break;
        case "mensclothing":
          products = await prisma.mensclothing.findMany();
          break;
        case "mensshoes":
          products = await prisma.mensshoes.findMany();
          break;
        case "toys":
          products = await prisma.toys.findMany();
          break;
        case "womensclothing":
          products = await prisma.womensclothing.findMany();
          break;
        case "womenshoes":
          products = await prisma.womenshoes.findMany();
          break;
        default:
          return NextResponse.json(
            { error: "Categoria inválida" },
            { status: 400 }
          );
      }

      // Adiciona a categoria aos produtos
      products = products.map((product) => ({
        ...product,
        category,
      }));
    } else {
      // Busca todos os produtos de todas as categorias
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
    }

    // Formata os produtos para o frontend
    const formattedProducts: FormattedProduct[] = products.map((product) => ({
      id: `${product.category}-${product.id}`,
      name: product.name,
      price: Number(product.price),
      description: product.description,
      image: product.image,
      category: product.category || "",
      stock: 10,
      brand: product.brand || "",
      sizes: product.sizes ? product.sizes.split(",") : [],
    }));

    return NextResponse.json(formattedProducts);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar produtos" },
      { status: 500 }
    );
  }
}
