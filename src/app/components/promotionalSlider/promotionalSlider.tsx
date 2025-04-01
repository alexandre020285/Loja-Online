"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./promotionalSlider.module.css";

const slides = [
  {
    id: 1,
    image: "/img/wc.jpg",
    title: "Womens Clothing",
    description: "Roupas femininas com até 50% de desconto",
    link: "/categoria/womens-clothing",
  },
  {
    id: 2,
    image: "/img/ms.jpg",
    title: "Mens Suits",
    description: "Ternos masculinos com até 40% de desconto",
    link: "/categoria/mens-suits",
  },
  {
    id: 3,
    image: "/img/vi.jpg",
    title: "Vintage Items",
    description: "Itens vintage com até 30% de desconto",
    link: "/categoria/vintage-items",
  },
  {
    id: 4,
    image: "/img/mc.jpg",
    title: "Mens Clothing",
    description: "Roupas masculinas com até 45% de desconto",
    link: "/categoria/mens-clothing",
  },
  {
    id: 5,
    image: "/img/to.jpg",
    title: "Top Offers",
    description: "Ofertas especiais com até 60% de desconto",
    link: "/categoria/top-offers",
  },
  {
    id: 6,
    image: "/img/ws.jpg",
    title: "Womens Suits",
    description: "Ternos femininos com até 35% de desconto",
    link: "/categoria/womens-suits",
  },
];

export default function PromotionalSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.slider}>
      <div
        className={styles.slides}
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <Link key={slide.id} href={slide.link} className={styles.slide}>
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              sizes="1280px"
              priority={index === 0}
              className={styles.image}
            />
            <div className={styles.content}>
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <button
        className={styles.prev}
        onClick={() =>
          setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
        }
      >
        ←
      </button>
      <button
        className={styles.next}
        onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
      >
        →
      </button>

      <div className={styles.dots}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${
              current === index ? styles.active : ""
            }`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  );
}
