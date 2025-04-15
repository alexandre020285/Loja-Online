"use client";

import { useState, useEffect } from "react";
import { useAuth } from "./contexts/AuthContext";
import { useCart } from "./contexts/CartContext";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "./components/header/header";
import MenuCategory from "./components/menuCategory/MenuCategory";
import PromotionalSlider from "./components/promotionalSlider/promotionalSlider";
import ProductList from "./components/productList/ProductList";
import { toast } from "react-toastify";
import styles from "./page.module.css";

interface Product {
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

export default function Home() {
  const { currentUser } = useAuth();
  const { addToCart, openCart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
      return;
    }

    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error("Erro ao buscar produtos");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError("Erro ao carregar produtos");
        console.error("Erro:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentUser, router]);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.imageUrl,
    });
    toast.success("Produto adicionado ao carrinho!");
    openCart();
  };

  if (loading) {
    return <div className={styles.loading}>Carregando...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <main className={styles.main}>
      <Header />
      <MenuCategory />
      <div className={styles.sliderContainer}>
        <PromotionalSlider />
      </div>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Produtos</h1>
        <div className={styles.productsGrid}>
          {products.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.imageContainer}>
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className={styles.productImage}
                />
              </div>
              <div className={styles.productInfo}>
                <h3 className={styles.productTitle}>{product.title}</h3>
                <p className={styles.productPrice}>
                  R$ {product.price.toFixed(2)}
                </p>
                <p className={styles.productCategory}>{product.category}</p>
                <p className={styles.productDescription}>
                  {product.description}
                </p>
                <button
                  className={styles.addToCartButton}
                  onClick={() => handleAddToCart(product)}
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
