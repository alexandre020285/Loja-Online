"use client";

import { useState } from "react";
import styles from "./ProductCard.module.css";
import ProductModal from "../productModal/ProductModal";
import { useCart } from "@/app/contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { formatPrice } from "@/app/utils/format";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  brand?: string;
  sizes?: string[];
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCart();
  const { currentUser } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!currentUser) {
      toast.info("Faça login para adicionar produtos ao carrinho");
      router.push("/login");
      return;
    }

    setIsLoading(true);
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
      .then(() => {
        toast.success(`${product.name} adicionado ao carrinho!`);
      })
      .catch(() => {
        toast.error("Erro ao adicionar o produto ao carrinho");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className={styles.card} onClick={() => setIsModalOpen(true)}>
        <div className={styles.imageContainer}>
          <img
            src={product.image}
            alt={product.name}
            className={styles.image}
            loading="lazy"
          />
        </div>
        <div className={styles.content}>
          <div className={styles.info}>
            <h3 className={styles.title}>{product.name}</h3>
            <p className={styles.description}>{product.description}</p>
            <p className={styles.price}>{formatPrice(product.price)}</p>
          </div>
          <div className={styles.buttonContainer}>
            <button
              onClick={handleAddToCart}
              className={styles.button}
              disabled={isLoading}
            >
              {isLoading ? "Adicionando..." : "Adicionar ao Carrinho"}
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ProductModal product={product} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
