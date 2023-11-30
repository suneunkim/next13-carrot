import { User } from "@prisma/client";
import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { IUserFavs } from "../Product/ProductCard";
import useFavorite from "@/hooks/useFavorite";

interface HeartButtonProps {
  productId: number;
  currentUser: IUserFavs | null;
}

const HeartButton = ({ productId, currentUser }: HeartButtonProps) => {
  const { hasFavorite, toggleFavorite } = useFavorite({
    productId,
    currentUser,
  });

  return (
    <div
      onClick={toggleFavorite}
      className="relative trnasition hover:opacity-60"
    >
      <AiOutlineHeart
        size={28}
        className=" absolute -top-[2px] -right-[2px]  fill-white"
      />
      <AiFillHeart
        size={24}
        className={hasFavorite ? "fill-rose-400" : "fill-gray-300 "}
      />
    </div>
  );
};

export default HeartButton;
