"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./ProductList.module.css";

// Tipo para os produtos
type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
};

type ProductListProps = {
  selectedCategory: string | null;
};

export default function ProductList({ selectedCategory }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Erro ao carregar produtos");
        }
        const data = await response.json();
        const productsWithCategory = data.map((product: any) => ({
          ...product,
          category: product.category || "uncategorized",
        }));
        setProducts(productsWithCategory);
        setFilteredProducts(productsWithCategory);
        setLoading(false);
      } catch (err) {
        setError(
          "Erro ao carregar produtos. Por favor, tente novamente mais tarde."
        );
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = products.filter(
        (product) =>
          product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory, products]);

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

  return (
    <div className={styles.mainContainer}>
      <div className={styles.productsContainer}>
        <h2>
          {selectedCategory
            ? `Produtos em ${
                selectedCategory.charAt(0).toUpperCase() +
                selectedCategory.slice(1)
              }`
            : "Todos os Produtos"}
        </h2>
        <div className={styles.productsGrid}>
          {filteredProducts.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <Link href={`/product/${product.id}`}>
                <div className={styles.imageContainer}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                    className={styles.productImage}
                  />
                </div>
                <h3>{product.name}</h3>
                <p className={styles.price}>R$ {product.price.toFixed(2)}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
