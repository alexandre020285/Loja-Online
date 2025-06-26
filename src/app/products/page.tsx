import ProductList from "@/app/components/productList/ProductList";

export default function ProductsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Todos os Produtos</h1>
      <ProductList />
    </main>
  );
}
