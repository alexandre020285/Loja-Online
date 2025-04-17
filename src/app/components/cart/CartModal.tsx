"use client";

import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import styles from "./CartModal.module.css";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatPrice } from "@/app/utils/format";

export default function CartModal() {
  const { cart, removeFromCart, updateQuantity, isOpen, closeCart, clearCart } =
    useCart();
  const { currentUser } = useAuth();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showUserData, setShowUserData] = useState(false);

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

  const handleCheckout = () => {
    setShowUserData(true);
  };

  const handleConfirmPurchase = () => {
    setShowUserData(false);
    setShowConfirmation(true);
    clearCart();
    toast.success("Compra realizada com sucesso! Obrigado pela preferência!", {
      position: "top-center",
      autoClose: 5000,
    });
    setTimeout(() => {
      setShowConfirmation(false);
      closeCart();
    }, 3000);
  };

  if (!isOpen) return null;

  if (showConfirmation) {
    return (
      <div className={styles.modalOverlay} onClick={closeCart}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div className={styles.modalContent}>
            <div className={styles.confirmationMessage}>
              <h2>Parabéns pela sua compra!</h2>
              <p>Seu pedido foi confirmado e será processado em breve.</p>
              <p>Você receberá um e-mail com os detalhes da compra.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.modalOverlay} onClick={closeCart}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h2>Carrinho de Compras</h2>
            <button
              onClick={closeCart}
              className={styles.closeButton}
              aria-label="Fechar carrinho"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {showUserData ? (
            <div className={styles.userData}>
              <h3>Confirme seus dados:</h3>
              <div className={styles.userInfo}>
                <p>
                  <strong>Nome:</strong> {currentUser?.name}
                </p>
                <p>
                  <strong>Email:</strong> {currentUser?.email}
                </p>
              </div>
              <div className={styles.cartFooter}>
                <div className={styles.total}>
                  <strong>Total:</strong>
                  <span>{formatPrice(total)}</span>
                </div>
                <button
                  className={styles.checkoutButton}
                  onClick={handleConfirmPurchase}
                >
                  Confirmar Compra
                </button>
                <button
                  className={styles.backButton}
                  onClick={() => setShowUserData(false)}
                >
                  Voltar ao Carrinho
                </button>
              </div>
            </div>
          ) : (
            <>
              {cart.length === 0 ? (
                <p>Seu carrinho está vazio</p>
              ) : (
                <>
                  <ul className={styles.cartItems}>
                    {cart.map((item) => (
                      <li key={item.id} className={styles.cartItem}>
                        <div className={styles.itemImage}>
                          <img src={item.image} alt={item.name} />
                        </div>
                        <div className={styles.itemDetails}>
                          <p>{item.name}</p>
                          <p>{formatPrice(item.price)}</p>
                          <div className={styles.quantityControls}>
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
                        <div className={styles.itemActions}>
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
                      <span>{formatPrice(total)}</span>
                    </div>
                    <button
                      className={styles.checkoutButton}
                      onClick={handleCheckout}
                    >
                      Finalizar Compra
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
