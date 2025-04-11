import MenuCategory from "@/app/components/menuCategory/MenuCategory";
import ProductList from "@/app/components/productList/ProductList";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params;

  return (
    <div>
      <MenuCategory />
      <div className="container mx-auto px-4 py-8">
        <ProductList category={category} />
      </div>
    </div>
  );
}
