import HomeBanner from "@/components/HomeBanner";
import getProducts, { ProductsParams } from "../\baction/getProducts";
import EmptyState from "@/components/EmptyState";
import Container from "@/components/Container";
import ProductCard from "@/components/Product/ProductCard";
import getCurrentUser from "../\baction/getCurrentUser";
import FloatingButton from "@/components/elements/FloatingButton";
import Categories from "@/components/categories/Categories";
import Pagination from "@/components/Pagination";

interface HomeProps {
  searchParams: ProductsParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const page = searchParams?.page === 0 ? 1 : searchParams?.page || 1;
  const pageNum = typeof page === "string" ? Number(page) : 1;

  const products = await getProducts(searchParams);
  const currentUser = await getCurrentUser();

  return (
    <div>
      <HomeBanner />
      <Container home>
        <div className="max-w-5xl flex flex-col items-center">
          {/* 카테고리 */}
          <Categories />
          {}

          {/* 상품 목록 */}
          {products?.data.length === 0 ? (
            <EmptyState showReset />
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
          )}
          {/* 페이지네이션 */}
          <Pagination
            page={pageNum}
            totalItems={products.totalItems}
            perPage={PRODUCT_PER_PAGE}
          />
        </div>
        <FloatingButton href="/products/upload">+</FloatingButton>
        <div className="w-full h-50 my-10 border"></div>
      </Container>
    </div>
  );
}

export const PRODUCT_PER_PAGE = 6;
