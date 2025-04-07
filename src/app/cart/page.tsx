"use client";

import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import Link from "next/link";
import styles from "./cart.module.css";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { currentUser } = useAuth();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
    toast.success("Item removido do carrinho!");
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    updateQuantity(id, quantity);
    toast.success("Quantidade atualizada!");
  };

  const handleCheckout = () => {
    if (!currentUser) {
      toast.error("Você precisa estar logado para finalizar a compra!");
      window.location.href = "/login";
      return;
    }
    setShowConfirmation(true);
  };

  const handleConfirmOrder = () => {
    clearCart();
    setShowConfirmation(false);
    toast.success("Pedido finalizado com sucesso! Obrigado pela compra!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Meu Carrinho</h1>
        <Link href="/" className={styles.backButton}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 12H5M5 12L12 19M5 12L12 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Voltar ao Início
        </Link>
      </div>

      {cart.length === 0 ? (
        <div className={styles.emptyCart}>
          <p>Seu carrinho está vazio</p>
          <Link href="/" className={styles.continueShopping}>
            Continuar Comprando
          </Link>
        </div>
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
                      handleUpdateQuantity(item.id, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className={styles.removeButton}
                  >
                    Remover
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className={styles.cartFooter}>
            <div className={styles.total}>
              <span>Total:</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
            <button className={styles.checkoutButton} onClick={handleCheckout}>
              Finalizar Compra
            </button>
          </div>
        </>
      )}

      {showConfirmation && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Confirmar Pedido</h2>
            <div className={styles.userInfo}>
              <h3>Dados do Usuário</h3>
              <p>
                <strong>Nome:</strong> {currentUser?.name}
              </p>
              <p>
                <strong>Email:</strong> {currentUser?.email}
              </p>
            </div>
            <div className={styles.orderSummary}>
              <h3>Resumo do Pedido</h3>
              <ul>
                {cart.map((item) => (
                  <li key={item.id}>
                    {item.name} - {item.quantity}x R$ {item.price.toFixed(2)}
                  </li>
                ))}
              </ul>
              <p className={styles.orderTotal}>
                <strong>Total:</strong> R$ {total.toFixed(2)}
              </p>
            </div>
            <div className={styles.modalActions}>
              <button
                className={styles.cancelButton}
                onClick={() => setShowConfirmation(false)}
              >
                Cancelar
              </button>
              <button
                className={styles.confirmButton}
                onClick={handleConfirmOrder}
              >
                Confirmar Pedido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
