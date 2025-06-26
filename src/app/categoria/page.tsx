"use client";

import { useSearchParams } from "next/navigation";
import MenuCategory from "@/app/components/menuCategory/MenuCategory";
import ProductList from "@/app/components/productList/ProductList";
import Header from "@/app/components/header/header";
import PromotionalSlider from "@/app/components/promotionalSlider/promotionalSlider";
import styles from "../page.module.css";

export default function CategoriaPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  return (
    <main className={styles.main}>
      <Header />
      <MenuCategory />
      <div className={styles.sliderContainer}>
        <PromotionalSlider />
      </div>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>
          {category
            ? `Produtos - ${getCategoryName(category)}`
            : "Todos os Produtos"}
        </h1>
        <ProductList category={category || undefined} />
      </div>
    </main>
  );
}

function getCategoryName(categoryId: string): string {
  const categories: Record<string, string> = {
    eletronics: "Eletrônicos",
    mensclothing: "Roupas Masculinas",
    mensshoes: "Calçados Masculinos",
    toys: "Brinquedos",
    womensclothing: "Roupas Femininas",
    womenshoes: "Calçados Femininos",
  };
  return categories[categoryId] || categoryId;
}
