"use client";

import { useCart } from "@/app/contexts/CartContext";
import Link from "next/link";
import styles from "./cart.module.css";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Cart() {
  const { items, removeFromCart, updateQuantity } = useCart();
  const router = useRouter();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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
      theme: "light",
    });
  };

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backButton}>
        ← Voltar para a Loja
      </Link>

      <div className={styles.header}>
        <h1 className={styles.title}>Carrinho de Compras</h1>
      </div>

      {items.length === 0 ? (
        <div className={styles.emptyCart}>
          <p>Seu carrinho está vazio</p>
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
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <p className={styles.itemPrice}>R$ {item.price.toFixed(2)}</p>
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

          <div className={styles.footer}>
            <div className={styles.total}>
              <span>Total:</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
            <Link href="/checkout" className={styles.checkoutButton}>
              Finalizar Compra
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
