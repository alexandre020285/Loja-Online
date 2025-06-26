import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Configuração do Supabase
const supabaseUrl = "https://jlkxpkfidbwgooanvjyt.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impsa3hwa2ZpZGJ3Z29vYW52anl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4OTAwOTUsImV4cCI6MjA2NjQ2NjA5NX0.YRqsskPESA-Xy-tDtPeP9KdAFhxJqjncbuOWXLN2IXI";

const supabase = createClient(supabaseUrl, supabaseKey);

interface BaseProduct {
  id: number;
  name: string;
  price: any;
  description: string;
  image: string;
  brand: string;
  sizes: string;
}

interface FormattedProduct {
  id: string;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
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
      // Busca produtos por categoria no Supabase
      const { data, error } = await supabase
        .from(category)
        .select('*');

      if (error) {
        console.error(`Erro ao buscar produtos da categoria ${category}:`, error);
        return NextResponse.json(
          { error: `Erro ao buscar produtos da categoria ${category}` },
          { status: 500 }
        );
      }

      products = data || [];
      
      // Adiciona a categoria aos produtos
      products = products.map((product) => ({
        ...product,
        category,
      }));
    } else {
      // Busca todos os produtos de todas as categorias no Supabase
      const categories = ['eletronics', 'mensclothing', 'mensshoes', 'toys', 'womensclothing', 'womenshoes'];
      
      const results = await Promise.all(
        categories.map(async (cat) => {
          const { data, error } = await supabase
            .from(cat)
            .select('*');
          
          if (error) {
            console.error(`Erro ao buscar produtos da categoria ${cat}:`, error);
            return [];
          }
          
          return data?.map((product) => ({ ...product, category: cat })) || [];
        })
      );

      products = results.flat();
    }

    // Formata os produtos para o frontend
    const formattedProducts: FormattedProduct[] = products.map((product) => ({
      id: `${product.category}-${product.id}`,
      title: product.name,
      price: Number(product.price),
      description: product.description,
      imageUrl: product.image,
      category: product.category || "",
      stock: 10,
      brand: product.brand || "",
      sizes: product.sizes ? product.sizes.split(",") : [],
    }));

    console.log(`📊 Retornando ${formattedProducts.length} produtos para categoria: ${category || 'todas'}`);
    
    return NextResponse.json(formattedProducts);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar produtos" },
      { status: 500 }
    );
  }
}
