"use client";
import { Fav, Product, User } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import HeartButton from "./HeartButton";

export interface IUserFavs extends User {
  favs: Fav[];
}

interface ProductCardProps {
  data: Product;
  currentUser: IUserFavs | null;
}

const ProductCard = ({ data, currentUser }: ProductCardProps) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/products/${data?.id}`)}
      className="w-[280px] cursor-pointer group space-y-[3px]"
    >
      <div
        className="relative w-full overflow-hidden aspect-square rounded-lg mb-3 transition group-hover:border-2 border-black/30
      "
      >
        {data?.imageSrc ? (
          <Image
            className="object-cover w-full h-full "
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
        {/* 로그인 한 유저에게만 하트 토글 보이게 하기 */}
        <div className="absolute top-3 right-3">
          <HeartButton productId={data.id} currentUser={currentUser} />
        </div>
      </div>
      {/* 상품 정보 */}
      <div className="text-lg my-[1px] mt-2 text-neutral-600">
        {data?.title}
      </div>
      <div className="font-semibold">{data?.price}원</div>
      <div className="flex justify-between text-gray-400 text-sm">
        <div className="space-x-2">
          <span>관심 0</span>
          <span>채팅 0</span>
        </div>
        <div>1일 전</div>
      </div>
      {/* <div>{data?.createAt}</div> */}
    </div>
  );
};

export default ProductCard;