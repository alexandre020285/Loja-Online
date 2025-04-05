"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./ProductList.module.css";

// Tipo para os produtos
type Product = {
  id: number;
  name: string;
  price: any; // Alterado para any para lidar com Decimal do Prisma
  image: string;
  category: string;
  description: string;
};

type ProductListProps = {
  selectedCategory: string | null;
};

// Mapeamento de categorias para nomes amigáveis
const categoryNames: Record<string, string> = {
  eletronics: "Eletrônicos",
  mensclothing: "Roupas Masculinas",
  mensshoes: "Calçados Masculinos",
  toys: "Brinquedos",
  womensclothing: "Roupas Femininas",
  womenshoes: "Calçados Femininos",
};

export default function ProductList({ selectedCategory }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função para formatar o preço corretamente, independente do tipo
  const formatPrice = (price: any): string => {
    if (price === null || price === undefined) return "0.00";

    // Se for um objeto Decimal do Prisma
    if (typeof price === "object" && price !== null) {
      // Tenta converter para string e depois para número
      return Number(String(price)).toFixed(2);
    }

    // Se for uma string
    if (typeof price === "string") {
      return Number(price).toFixed(2);
    }

    // Se for um número
    if (typeof price === "number") {
      return price.toFixed(2);
    }

    // Fallback seguro
    return "0.00";
  };

  // Buscar produtos da API local que acessa o PostgreSQL
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        console.log("Iniciando busca de produtos...");
        const response = await fetch("/api/products");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Dados recebidos da API:", data);

        if (!Array.isArray(data)) {
          throw new Error("Dados recebidos não são um array");
        }

        const allProducts = data.map((product: any) => {
          console.log("Processando produto:", product);
          return {
            ...product,
            category: product.category || "uncategorized",
          };
        });

        console.log("Total de produtos processados:", allProducts.length);
        console.log("Categorias disponíveis:", [
          ...new Set(allProducts.map((p) => p.category)),
        ]);

        setProducts(allProducts);
        setFilteredProducts(allProducts);
        setLoading(false);
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
        setError(
          "Erro ao carregar produtos do banco de dados. Por favor, tente novamente mais tarde."
        );
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filtrar produtos quando a categoria muda
  useEffect(() => {
    if (selectedCategory && products.length > 0) {
      console.log("\nFiltrando por categoria:", selectedCategory);
      console.log("Total de produtos antes da filtragem:", products.length);

      // Normalizar o nome da categoria selecionada
      const normalizedSelectedCategory = selectedCategory
        .toLowerCase()
        .replace(/\s+/g, "");

      const filtered = products.filter((product) => {
        // Normalizar o nome da categoria do produto
        const normalizedProductCategory = product.category.toLowerCase();
        const matches =
          normalizedProductCategory === normalizedSelectedCategory;
        console.log(
          `Produto: ${product.name} | Categoria: ${product.category} | Match: ${matches}`
        );
        return matches;
      });

      console.log("Produtos filtrados:", filtered.length);
      console.log("Categorias nos produtos filtrados:", [
        ...new Set(filtered.map((p) => p.category)),
      ]);

      setFilteredProducts(filtered);
    } else {
      console.log("Mostrando todos os produtos:", products.length);
      console.log("Categorias disponíveis:", [
        ...new Set(products.map((p) => p.category)),
      ]);
      setFilteredProducts(products);
    }
  }, [selectedCategory, products]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    console.log("Erro ao carregar imagem:", target.src);
    target.src = "/placeholder.jpg";
    target.alt = "Imagem não disponível";
  };

  // Função para adicionar timestamp à URL da imagem
  const getImageUrl = (url: string) => {
    if (!url) return "/placeholder.jpg";
    return `${url}?t=${Date.now()}`;
  };

  if (loading) {
    return (
      <div className={styles.mainContainer}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>Carregando produtos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.mainContainer}>
        <div className={styles.errorContainer}>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // Verificar se temos produtos para exibir
  if (products.length === 0) {
    return (
      <div className={styles.mainContainer}>
        <div className={styles.errorContainer}>
          <p>
            Nenhum produto encontrado no banco de dados. Verifique se o banco
            foi configurado corretamente.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.productsContainer}>
        <h2>
          {selectedCategory
            ? `Produtos em ${
                categoryNames[selectedCategory] || selectedCategory
              }`
            : "Todos os Produtos"}
        </h2>
        {filteredProducts.length === 0 ? (
          <p>Nenhum produto encontrado para esta categoria.</p>
        ) : (
          <div className={styles.productsGrid}>
            {filteredProducts.map((product) => {
              console.log("Renderizando produto:", product);
              return (
                <div
                  key={`${product.category}-${product.id}`}
                  className={styles.productCard}
                >
                  <Link href={`/product/${product.id}`}>
                    <div className={styles.imageContainer}>
                      <img
                        src={product.image}
                        alt={product.name}
                        onError={handleImageError}
                        className={styles.productImage}
                        loading="lazy"
                      />
                    </div>
                    <h3>{product.name}</h3>
                    <p className={styles.price}>
                      R$ {formatPrice(product.price)}
                    </p>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
