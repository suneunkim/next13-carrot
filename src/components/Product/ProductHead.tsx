import React from "react";
import { IUserFavs } from "./ProductCard";
import Image from "next/image";
import HeartButton from "../elements/HeartButton";

interface ProductHeadProps {
  imageSrc: string;
  id: number;
  currentUser: IUserFavs | null;
}
const ProductHead = ({ imageSrc, id, currentUser }: ProductHeadProps) => {
  return (
    <>
      <div className="relative w-full h-[50vh] overflow-hidden rounded-lg">
        <Image
          className="object-cover w-full"
          src={imageSrc}
          fill
          alt="Product"
        />
        <div className="absolute top-5 right-5">
          <HeartButton productId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ProductHead;
