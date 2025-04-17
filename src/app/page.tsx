"use client";

import { useState } from "react";
import { useAuth } from "./contexts/AuthContext";
import { useCart } from "./contexts/CartContext";
import Header from "./components/header/header";
import MenuCategory from "./components/menuCategory/MenuCategory";
import PromotionalSlider from "./components/promotionalSlider/promotionalSlider";
import ProductList from "./components/productList/ProductList";
import styles from "./page.module.css";

export default function Home() {
  const { currentUser } = useAuth();
  const { addToCart } = useCart();
  const [error, setError] = useState<string | null>(null);

  return (
    <main className={styles.main}>
      <Header />
      <MenuCategory />
      <div className={styles.sliderContainer}>
        <PromotionalSlider />
      </div>
      <div className={styles.container}>
        <ProductList category={undefined} />
      </div>
    </main>
  );
}
