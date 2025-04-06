"use client";

import { useCart } from "@/app/contexts/CartContext";
import Link from "next/link";
import styles from "./cart.module.css";

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCart();

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

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
              onClick={() => removeItem(item.id)}
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
