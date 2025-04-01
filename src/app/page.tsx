import Image from "next/image";
import styles from "./page.module.css";
import Header from "./components/header/header";
import PromotionalSlider from "./components/promotionalSlider/promotionalSlider";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <PromotionalSlider />
    </div>
  );
}
