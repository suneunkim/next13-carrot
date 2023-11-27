"use client";
import Button from "@/components/Button";
import Container from "@/components/Container";
import { IProductFavs, IUserFavs } from "@/components/Product/ProductCard";
import ProductHead from "@/components/Product/ProductHead";
import ProductInfo from "@/components/Product/ProductInfo";
import { categories } from "@/components/categories/Categories";
import { User } from "@prisma/client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React from "react";

interface ProductClientProps {
  product: IProductFavs & { user: User };
  currentUser: IUserFavs | null;
}

const ProductClient = ({ product, currentUser }: ProductClientProps) => {
  const router = useRouter();
  const KaKaoMap = dynamic(() => import("../../../components/KaKaoMap"), {
    ssr: false,
    loading: () => <div>로딩중...</div>,
  });
  const category = categories.find((item) => item.path === product.category);

  return (
    <Container>
      <div className="max-w-screen-md 5xl mx-auto">
        <div className="flex flex-col gap-5">
          <ProductHead
            imageSrc={product.imageSrc}
            id={product.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1">
            <ProductInfo
              user={product.user}
              title={product.title}
              category={category!}
              createAt={product.createAt}
              price={product.price}
              description={product.description}
            />
            <div>
              <KaKaoMap
                detailPage
                latitude={product.latitude}
                longitude={product.longitude}
              />
            </div>
          </div>
        </div>
        <div>
          <Button
            onClick={() => router.push("/chat")}
            label="이 유저와 채팅하기"
          />
        </div>
      </div>
    </Container>
  );
};

export default ProductClient;
