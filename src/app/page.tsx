import Image from "next/image";
import styles from "./page.module.css";
import Header from "./components/header/header";
import PromotionalSlider from "./components/promotionalSlider/promotionalSlider";
import ProductList from "./components/productList/ProductList";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <PromotionalSlider />
      <ProductList />
    </div>
  );
}
