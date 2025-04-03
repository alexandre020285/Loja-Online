"use client";

import { useState, useEffect } from "react";
import styles from "./ProductList.module.css";

// Tipo para os produtos
type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/products");

        if (!response.ok) {
          throw new Error("Erro ao buscar produtos");
        }

        const data = await response.json();
        // Combinar todos os produtos em uma única lista
        const allProducts: Product[] = [];

        // Iterar sobre cada categoria e adicionar seus produtos
        Object.entries(data).forEach(
          ([category, categoryProducts]: [string, any]) => { 
            if (Array.isArray(categoryProducts)) {
              allProducts.push(...categoryProducts);
            }
          }
        );

        console.log("Total de produtos:", allProducts.length); // Para debug
        setProducts(allProducts);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Carregando produtos...</div>;
  }

  if (error) {
    return <div className={styles.error}>Erro: {error}</div>;
  }

  return (
    <div className={styles.productsContainer}>
      <h2>Produtos em Destaque</h2>
      <div className={styles.productsGrid}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <img src={product.image} alt={product.name} />
            <h4>{product.name}</h4>
            <p>R$ {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
