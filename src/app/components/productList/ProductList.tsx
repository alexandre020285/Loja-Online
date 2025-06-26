"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "./ProductList.module.css";
import ProductCard from "../productCard/ProductCard";
import { useCart } from "@/app/contexts/CartContext";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  stock: number;
}

interface ProductListProps {
  category?: string;
}

// Nomes amigáveis das categorias
const categoryNames: Record<string, string> = {
  eletronics: "Eletrônicos",
  mensclothing: "Roupas Masculinas",
  mensshoes: "Calçados Masculinos",
  toys: "Brinquedos",
  womensclothing: "Roupas Femininas",
  womenshoes: "Calçados Femininos",
};

export default function ProductList({ category }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const url = category
        ? `/api/products?category=${category}`
        : "/api/products";
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Erro ao carregar produtos: ${response.status}`);
      }

      const data = await response.json();
      setProducts(
        data.map((product: any) => ({
          id: product.id,
          name: product.title || product.name,
          price: product.price,
          description: product.description,
          image: product.imageUrl || product.image,
          category: product.category,
          stock: product.stock || 10,
        }))
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao carregar produtos"
      );
      toast.error("Erro ao carregar produtos. Tente novamente.");
      console.error("Erro detalhado:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Categoria atual:", category);
    fetchProducts();
  }, [category]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Carregando produtos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p>{error}</p>
        <button onClick={fetchProducts} className={styles.retryButton}>
          Tentar Novamente
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <p>
          Nenhum produto encontrado para a categoria{" "}
          {categoryNames[category || ""] || category}.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.productsGrid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
