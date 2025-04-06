"use client";

import { useCart } from "@/app/contexts/CartContext";
import Link from "next/link";
import styles from "./cartModal.module.css";

export default function CartModal() {
  const { isOpen, closeCart, items, removeItem, updateQuantity } = useCart();

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={closeCart}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={closeCart}>
          ×
        </button>
        <h2 className={styles.title}>Carrinho de Compras</h2>

        {items.length === 0 ? (
          <div className={styles.emptyCart}>
            <p>Seu carrinho está vazio</p>
            <Link
              href="/"
              className={styles.continueShopping}
              onClick={closeCart}
            >
              Continuar Comprando
            </Link>
          </div>
        ) : (
          <>
            <div className={styles.items}>
              {items.map((item) => (
                <div key={item.id} className={styles.item}>
                  <div className={styles.imageContainer}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className={styles.image}
                      width={80}
                      height={80}
                    />
                  </div>
                  <div className={styles.details}>
                    <h3>{item.name}</h3>
                    <p className={styles.price}>R$ {item.price.toFixed(2)}</p>
                    <div className={styles.quantity}>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className={styles.removeButton}
                    onClick={() => removeItem(item.id)}
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>
            <div className={styles.summary}>
              <div className={styles.total}>
                <span>Total:</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
              <Link
                href="/checkout"
                className={styles.checkoutButton}
                onClick={closeCart}
              >
                Finalizar Compra
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
