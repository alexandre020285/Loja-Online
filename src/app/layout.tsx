import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./contexts/CartContext";
import { WalletProvider } from "./contexts/WalletContext";
import WalletModal from "./components/wallet/WalletModal";
import CartModal from "./components/cart/CartModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Loja Online",
  description: "Sua loja online favorita",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <WalletProvider>
          <CartProvider>
            {children}
            <WalletModal />
            <CartModal />
            <ToastContainer />
          </CartProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
