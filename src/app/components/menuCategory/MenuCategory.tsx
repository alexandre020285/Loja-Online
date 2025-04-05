"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./MenuCategory.module.css";

// Lista de categorias disponíveis
type Category = {
  id: number;
  name: string;
  value: string;
};

const categories: Category[] = [
  { id: 1, name: "Eletrônicos", value: "eletronics" },
  { id: 2, name: "Roupas Masculinas", value: "mensclothing" },
  { id: 3, name: "Calçados Masculinos", value: "mensshoes" },
  { id: 4, name: "Brinquedos", value: "toys" },
  { id: 5, name: "Roupas Femininas", value: "womensclothing" },
  { id: 6, name: "Calçados Femininos", value: "womenshoes" },
];

// Props do componente
type Props = {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
};

export default function MenuCategory({
  selectedCategory,
  onSelectCategory,
}: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Função para lidar com o clique em uma categoria
  const handleCategoryClick = (categoryId: string) => {
    const newCategory = selectedCategory === categoryId ? null : categoryId;
    onSelectCategory(newCategory);
    setIsMenuOpen(false);
  };

  return (
    <div className={styles.menuContainer}>
      <div className={styles.menuHeader}>
        {/* Botão do menu mobile */}
        <button
          className={styles.mobileMenuButton}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
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
              onClick={() => handleCategoryClick(category.value)}
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

        {/* Link do carrinho */}
        <Link href="/cart" className={styles.cartLink}>
          <Image
            src="/img/cart.png"
            alt="Carrinho"
            width={20}
            height={20}
            className={styles.cartIcon}
          />
          <span>Meu Carrinho</span>
        </Link>
      </div>
    </div>
  );
}
