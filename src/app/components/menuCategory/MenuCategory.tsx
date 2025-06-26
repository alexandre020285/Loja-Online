"use client";

import { useRouter, useSearchParams } from "next/navigation";
import styles from "./MenuCategory.module.css";

const categories = [
  { id: "eletronics", name: "Eletrônicos" },
  { id: "mensclothing", name: "Roupas Masculinas" },
  { id: "mensshoes", name: "Calçados Masculinos" },
  { id: "toys", name: "Brinquedos" },
  { id: "womensclothing", name: "Roupas Femininas" },
  { id: "womenshoes", name: "Calçados Femininos" },
];

export default function MenuCategory() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  const handleCategoryClick = (categoryId: string) => {
    if (currentCategory === categoryId) {
      // Se a categoria já está selecionada, volta para a home
      router.push("/");
    } else {
      // Seleciona a nova categoria
      router.push(`/categoria?category=${categoryId}`);
    }
  };

  return (
    <div className={styles.menuContainer}>
      <div className={styles.categories}>
        {categories.map((category) => (
          <button
            key={category.id}
            className={`${styles.categoryButton} ${
              currentCategory === category.id ? styles.active : ""
            }`}
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
