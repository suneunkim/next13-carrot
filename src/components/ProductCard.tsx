"use client";
import { Product, User } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import HeartButton from "./HeartButton";

interface ProductCardProps {
  data: Product;
  currentUser: User | null;
}

const ProductCard = ({ data, currentUser }: ProductCardProps) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/products/${data?.id}`)}
      className="w-[280px] cursor-pointer group space-y-[1px]"
    >
      <div className="relative w-full overflow-hidden aspect-square rounded-lg">
        {data?.imageSrc ? (
          <Image
            className="object-cover w-full h-full transition group-hover:scale-110"
            src={data?.imageSrc}
            fill
            sizes="auto"
            alt="상품 이미지"
          />
        ) : (
          <div className="w-full h-full bg-slate-200 text-sm flex items-center justify-center text-gray-500">
            이미지가 없습니다.
          </div>
        )}
      </div>
      {/* 상품 정보 */}
      <div className="text-lg my-[1px] text-neutral-600">{data?.title}</div>
      <div className="font-semibold">{data?.price}원</div>
      <div className="flex justify-between text-gray-400 text-sm">
        <div className="space-x-2">
          <span>관심 0</span>
          <span>채팅 0</span>
        </div>
        <div>1일 전</div>
      </div>
      <HeartButton />
      {/* <div>{data?.createAt}</div> */}
    </div>
  );
};

export default ProductCard;
