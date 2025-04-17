"use client";

import { useCart } from "@/app/contexts/CartContext";
import styles from "./productModal.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatPrice } from "@/app/utils/format";

interface ProductModalProps {
  product: {
    id: string;
    name: string;
    price: number | string;
    image: string;
    description: string;
  };
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.image,
    });
    toast.success("Produto adicionado ao carrinho!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <div className={styles.content}>
          <div className={styles.imageContainer}>
            <img
              src={product.image}
              alt={product.name}
              className={styles.image}
            />
          </div>
          <div className={styles.details}>
            <h2 className={styles.title}>{product.name}</h2>
            <div className={styles.productInfo}>
              <p className={styles.description}>{product.description}</p>
              <p className={styles.price}>{formatPrice(product.price)}</p>
            </div>
            <button className={styles.addButton} onClick={handleAddToCart}>
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
