"use client";

import { useCart } from "../../contexts/CartContext";
import styles from "./CartModal.module.css";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CartModal() {
  const { cart, removeFromCart, updateQuantity, isOpen, closeCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleRemoveItem = (id: string, name: string) => {
    removeFromCart(id);
    toast.success(`${name} removido do carrinho!`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={closeCart}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h2>Carrinho de Compras</h2>
            <button onClick={closeCart} className={styles.closeButton} aria-label="Fechar carrinho">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          {cart.length === 0 ? (
            <p>Seu carrinho está vazio</p>
          ) : (
            <>
              <ul className={styles.cartItems}>
                {cart.map((item) => (
                  <li key={item.id} className={styles.cartItem}>
                    <div className={styles.itemInfo}>
                      <h3>{item.name}</h3>
                      <p>R$ {item.price.toFixed(2)}</p>
                    </div>
                    <div className={styles.itemActions}>
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
                      <button
                        onClick={() => handleRemoveItem(item.id, item.name)}
                        className={styles.removeButton}
                      >
                        🗑️
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className={styles.cartFooter}>
                <div className={styles.total}>
                  <strong>Total:</strong>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
                <button className={styles.checkoutButton}>
                  Finalizar Compra
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
