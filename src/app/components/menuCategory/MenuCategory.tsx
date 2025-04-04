"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./MenuCategory.module.css";

export type Category = {
  id: string;
  name: string;
  icon: string;
};

export const categories: Category[] = [
  { id: "mensclothing", name: "Roupas Masculinas", icon: "👔" },
  { id: "mensShoes", name: "Calçados Masculinos", icon: "👞" },
  { id: "womensclothing", name: "Roupas Femininas", icon: "👗" },
  { id: "womensShoes", name: "Calçados Femininos", icon: "👠" },
  { id: "eletronics", name: "Eletrônicos", icon: "📱" },
  { id: "toys", name: "Brinquedos", icon: "🎮" },
];

type MenuCategoryProps = {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
};

export default function MenuCategory({
  selectedCategory,
  onSelectCategory,
}: MenuCategoryProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCategoryClick = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      onSelectCategory(null);
    } else {
      onSelectCategory(categoryId);
    }
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.menuContainer}>
      <div className={styles.menuHeader}>
        <button
          className={styles.mobileMenuButton}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
        <div
          className={`${styles.categoryList} ${isMenuOpen ? styles.open : ""}`}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              className={`${styles.categoryButton} ${
                selectedCategory === category.id ? styles.active : ""
              }`}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.icon} {category.name}
            </button>
          ))}
        </div>
        <Link href="/cart" className={styles.cartLink}>
          <Image
            src="/img/cart.png"
            alt="Carrinho"
            width={24}
            height={24}
            className={styles.cartIcon}
          />
          <span>Meu Carrinho</span>
        </Link>
      </div>
    </div>
  );
}
