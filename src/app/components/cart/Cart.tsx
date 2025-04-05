import { useState } from "react";
import Image from "next/image";
import styles from "./cart.module.css";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

export default function Cart({
  items,
  isOpen,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
}: CartProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (!isOpen) return null;

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Aqui você pode adicionar a lógica de checkout
    setTimeout(() => {
      setIsCheckingOut(false);
      // Redirecionar para página de checkout ou processar pagamento
    }, 1500);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.cart} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

        <h2>Carrinho de Compras</h2>

        {items.length === 0 ? (
          <p className={styles.empty}>Seu carrinho está vazio</p>
        ) : (
          <>
            <div className={styles.items}>
              {items.map((item) => (
                <div key={item.id} className={styles.item}>
                  <div className={styles.imageContainer}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className={styles.image}
                    />
                  </div>

                  <div className={styles.details}>
                    <h3>{item.name}</h3>
                    <p className={styles.price}>{formatPrice(item.price)}</p>

                    <div className={styles.actions}>
                      <div className={styles.quantity}>
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>

                      <button
                        className={styles.remove}
                        onClick={() => onRemoveItem(item.id)}
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.footer}>
              <div className={styles.total}>
                <span>Total:</span>
                <span>{formatPrice(total)}</span>
              </div>

              <button
                className={styles.checkout}
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? "Processando..." : "Finalizar Compra"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
