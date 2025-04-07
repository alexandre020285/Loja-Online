"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./MenuCategory.module.css";

interface MenuCategoryProps {
  categories?: string[];
}

export default function MenuCategory({ categories = [] }: MenuCategoryProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Lista padrão de categorias caso nenhuma seja fornecida
  const defaultCategories = [
    "Eletrônicos",
    "Roupas Masculinas",
    "Calçados Masculinos",
    "Brinquedos",
    "Roupas Femininas",
    "Calçados Femininos",
  ];

  const categoriesToShow =
    categories.length > 0 ? categories : defaultCategories;

  return (
    <div className={styles.menuContainer}>
      <div className={styles.menuContent}>
        {categoriesToShow.map((category) => (
          <Link
            key={category}
            href={`/categoria/${category.toLowerCase()}`}
            className={`${styles.categoryButton} ${
              activeCategory === category ? styles.active : ""
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </Link>
        ))}
      </div>
    </div>
  );
}
