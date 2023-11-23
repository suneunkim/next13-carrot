import HomeBanner from "@/components/HomeBanner";
import getProducts, { ProductsParams } from "../\baction/getProducts";
import EmptyState from "@/components/EmptyState";
import Container from "@/components/Container";
import ProductCard from "@/components/ProductCard";
import getCurrentUser from "../\baction/getCurrentUser";
import FloatingButton from "@/components/FloatingButton";

interface HomeProps {
  searchParams: ProductsParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const products = await getProducts(searchParams);
  const currentUser = await getCurrentUser();

  return (
    <div>
      <HomeBanner />
      <Container home>
        <div className="max-w-5xl flex flex-col items-center">
          {/* 카테고리 */}
          <div className="flex justify-center space-x-2 overflow-x-auto">
            <div className="px-4 py-2 rounded-full bg-neutral-100">전체</div>
            <div className="px-4 py-2 rounded-full bg-neutral-100">디지털</div>
            <div className="px-4 py-2 rounded-full bg-neutral-100">가구</div>
            <div className="px-4 py-2 rounded-full bg-neutral-100">유아동</div>
            <div className="px-4 py-2 rounded-full bg-neutral-100">생활</div>
            <div className="px-4 py-2 rounded-full bg-neutral-100">스포츠</div>
          </div>
          {/* 상품 목록 */}
          {products?.data.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14 pt-12">
              {products.data.map((product) => (
                <ProductCard
                  currentUser={currentUser}
                  key={product.id}
                  data={product}
                />
              ))}
            </div>
            // 페이지네이션
          )}
        </div>
        <FloatingButton href="/products/upload">+</FloatingButton>
      </Container>
    </div>
  );
}
