import { useState } from "react";
import Image from "next/image";
import styles from "./productModal.module.css";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  brand?: string;
  size?: string;
  color?: string;
}

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function ProductModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);

  if (!isOpen) return null;

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

        <div className={styles.content}>
          <div className={styles.imageContainer}>
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              className={styles.image}
            />
          </div>

          <div className={styles.details}>
            <h2>{product.name}</h2>
            <p className={styles.description}>{product.description}</p>
            <p className={styles.price}>{formatPrice(product.price)}</p>

            {product.brand && (
              <p className={styles.info}>
                <strong>Marca:</strong> {product.brand}
              </p>
            )}
            {product.size && (
              <p className={styles.info}>
                <strong>Tamanho:</strong> {product.size}
              </p>
            )}
            {product.color && (
              <p className={styles.info}>
                <strong>Cor:</strong> {product.color}
              </p>
            )}
            <p className={styles.stock}>
              <strong>Estoque:</strong> {product.stock} unidades
            </p>

            <div className={styles.actions}>
              <div className={styles.quantity}>
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() =>
                    setQuantity((q) => Math.min(product.stock, q + 1))
                  }
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>

              <button
                className={styles.addToCart}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
