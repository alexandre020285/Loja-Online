"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Header from "./components/header/header";
import PromotionalSlider from "./components/promotionalSlider/promotionalSlider";
import ProductList from "./components/productList/ProductList";
import MenuCategory from "./components/menuCategory/MenuCategory";
import { useState } from "react";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <main className={styles.main}>
      <Header />
      <MenuCategory
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <PromotionalSlider />
      <ProductList selectedCategory={selectedCategory} />
    </main>
  );
}
