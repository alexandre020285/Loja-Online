"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./promotionalSlider.module.css";

type Slide = {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
};

const slides: Slide[] = [
  {
    id: 1,
    title: "Promoções de Roupas Femininas",
    description: "Roupas femininas com até 50% de desconto",
    image: "/img/wc.jpg",
    link: "#",
  },
  {
    id: 2,
    title: "Promoções de Tênis Masculinos",
    description: "Tênis masculinos com até 40% de desconto",
    image: "/img/ms.jpg",
    link: "#",
  },
  {
    id: 3,
    title: "Promoções de Itens Vintage",
    description: "Itens vintage com até 30% de desconto",
    image: "/img/vi.jpg",
    link: "#",
  },
  {
    id: 4,
    title: "Promoções de Roupas Masculinas",
    description: "Roupas masculinas com até 45% de desconto",
    image: "/img/mc.jpg",
    link: "#",
  },
  {
    id: 5,
    title: "Ofertas Especiais",
    description: "Ofertas especiais com até 60% de desconto",
    image: "/img/to.jpg",
    link: "/#",
  },
  {
    id: 6,
    title: "Promoções de Tênis Femininos",
    description: "Ternos femininos com até 35% de desconto",
    image: "/img/ws.jpg",
    link: "#",
  },
];

export default function PromotionalSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.slider}>
      <div
        className={styles.slides}
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <Link key={slide.id} href={slide.link} className={styles.slide}>
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1280px"
              className={styles.image}
              priority={index === 0}
            />
            <div className={styles.content}>
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className={styles.dots}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${
              index === currentSlide ? styles.active : ""
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
