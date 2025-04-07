"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./MenuCategory.module.css";

// Lista de categorias disponíveis
const categories = [
  { id: 1, name: "Eletrônicos", value: "eletronics" },
  { id: 2, name: "Roupas Masculinas", value: "mensclothing" },
  { id: 3, name: "Calçados Masculinos", value: "mensshoes" },
  { id: 4, name: "Brinquedos", value: "toys" },
  { id: 5, name: "Roupas Femininas", value: "womensclothing" },
  { id: 6, name: "Calçados Femininos", value: "womenshoes" },
];

// Props do componente
interface MenuCategoryProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export default function MenuCategory({
  selectedCategory,
  onSelectCategory,
}: MenuCategoryProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={styles.menuContainer}>
      <div className={styles.menuHeader}>
        {/* Botão do menu mobile */}
        <button
          className={styles.mobileMenuButton}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>

        {/* Lista de categorias */}
        <div
          className={`${styles.categoryList} ${isMenuOpen ? styles.open : ""}`}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              className={`${styles.categoryButton} ${
                selectedCategory === category.value ? styles.active : ""
              }`}
              onClick={() => {
                onSelectCategory(
                  selectedCategory === category.value ? null : category.value
                );
                setIsMenuOpen(false);
              }}
            >
              {category.name}
            </button>
          ))}

          {/* Logo do site (visível apenas no mobile) */}
          <Image
            src="/img/logo.png"
            alt="Logo do site"
            width={120}
            height={40}
            className={styles.siteLogo}
          />
        </div>
      </div>
    </div>
  );
}
