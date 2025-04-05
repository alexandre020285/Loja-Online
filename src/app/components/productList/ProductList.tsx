"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./ProductList.module.css";

// Tipos
type Product = {
  id: number;
  name: string;
  price: any;
  image: string;
  category: string;
  description: string;
};

type ProductListProps = {
  selectedCategory: string | null;
};

// Nomes amigáveis das categorias
const categoryNames: Record<string, string> = {
  eletronics: "Eletrônicos",
  mensclothing: "Roupas Masculinas",
  mensshoes: "Calçados Masculinos",
  toys: "Brinquedos",
  womensclothing: "Roupas Femininas",
  womenshoes: "Calçados Femininos",
};

export default function ProductList({ selectedCategory }: ProductListProps) {
  // Estados
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Funções auxiliares
  const formatPrice = (price: any): string => {
    if (!price) return "0.00";
    return Number(price).toFixed(2);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = "/placeholder.jpg";
    target.alt = "Imagem não disponível";
  };

  // Buscar produtos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/products");

        if (!response.ok) throw new Error("Erro ao carregar produtos");

        const data = await response.json();
        if (!Array.isArray(data)) throw new Error("Dados inválidos");

        const allProducts = data.map((product) => ({
          ...product,
          category: product.category || "uncategorized",
        }));

        setProducts(allProducts);
        setFilteredProducts(allProducts);
      } catch (err) {
        setError("Erro ao carregar produtos. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filtrar produtos por categoria
  useEffect(() => {
    if (!selectedCategory) {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter(
      (product) =>
        product.category.toLowerCase() === selectedCategory.toLowerCase()
    );
    setFilteredProducts(filtered);
  }, [selectedCategory, products]);

  // Renderização condicional
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

  if (products.length === 0) {
    return (
      <div className={styles.mainContainer}>
        <div className={styles.errorContainer}>
          <p>Nenhum produto encontrado.</p>
        </div>
      </div>
    );
  }

  // Renderização principal
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
            {filteredProducts.map((product) => (
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
