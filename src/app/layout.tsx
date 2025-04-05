import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./contexts/CartContext";

export const metadata: Metadata = {
  title: "Loja Online",
  description: "A melhor loja online para você",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.variable}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
