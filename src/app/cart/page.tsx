"use client";

import { useCart } from "@/app/contexts/CartContext";
import Link from "next/link";
import styles from "./cart.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity } = useCart();

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleRemoveItem = (id: string, name: string) => {
    toast.warn(
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: "16px", marginBottom: "20px", color: "#333" }}>
          Tem certeza que deseja remover
          <br />
          <strong style={{ color: "#ff4757" }}>{name}</strong>
          <br />
          do carrinho?
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
          <button
            onClick={() => toast.dismiss()}
            style={{
              padding: "10px 24px",
              background: "#f5f5f5",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              color: "#333",
              fontSize: "14px",
              fontWeight: "500",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#e8e8e8")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#f5f5f5")}
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              removeFromCart(id);
              toast.dismiss();
              toast.success(`${name} foi removido do carrinho!`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }}
            style={{
              padding: "10px 24px",
              background: "#ff4757",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              color: "white",
              fontSize: "14px",
              fontWeight: "500",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#ff6b81")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#ff4757")}
          >
            Remover
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
        className: "custom-toast-confirm",
        style: {
          background: "white",
          padding: "25px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          minWidth: "320px",
          position: "fixed",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          marginTop: "0",
        },
      }
    );
  };

  if (items.length === 0) {
    return (
      <div className={styles.cart}>
        <h1>Carrinho de Compras</h1>
        <div className={styles.emptyCart}>
          <p>Seu carrinho está vazio</p>
          <Link href="/" className={styles.continueShopping}>
            Continuar Comprando
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cart}>
      <h1>Carrinho de Compras</h1>
      <div className={styles.items}>
        {items.map((item) => (
          <div key={item.id} className={styles.item}>
            <div className={styles.imageContainer}>
              <img
                src={item.image}
                alt={item.name}
                className={styles.image}
                width={100}
                height={100}
              />
            </div>
            <div className={styles.details}>
              <h3>{item.name}</h3>
              <p className={styles.price}>R$ {item.price.toFixed(2)}</p>
              <div className={styles.quantity}>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
            <button
              className={styles.removeButton}
              onClick={() => handleRemoveItem(item.id, item.name)}
            >
              Remover
            </button>
          </div>
        ))}
      </div>
      <div className={styles.summary}>
        <h2>Resumo do Pedido</h2>
        <div className={styles.total}>
          <span>Total:</span>
          <span>R$ {total.toFixed(2)}</span>
        </div>
        <Link href="/checkout" className={styles.checkoutButton}>
          Finalizar Compra
        </Link>
      </div>
    </div>
  );
}
