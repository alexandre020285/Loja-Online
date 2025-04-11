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
      // Se a categoria já está selecionada, remove o filtro
      router.push("/");
    } else {
      // Seleciona a nova categoria
      router.push(`/?category=${categoryId}`);
    }
  };

  return (
    <div className={styles.menuContainer}>
      <h2>Categorias</h2>
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
