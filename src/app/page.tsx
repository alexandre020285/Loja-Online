"use client";

import { useSearchParams } from "next/navigation";
import Header from "./components/header/header";
import MenuCategory from "./components/menuCategory/MenuCategory";
import PromotionalSlider from "./components/promotionalSlider/promotionalSlider";
import ProductList from "./components/productList/ProductList";

export default function Home() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  return (
    <main className="container mx-auto px-4 py-8">
      <Header />
      <MenuCategory />
      <PromotionalSlider />
      <ProductList category={category || undefined} />
    </main>
  );
}
