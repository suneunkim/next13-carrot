import { User } from "@prisma/client";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";

interface HeartButtonProps {
  productId: number;
  currentUser: User | null;
}

const HeartButton = ({ productId, currentUser }: HeartButtonProps) => {
  return (
    <div>
      <AiOutlineHeart size={19} />
    </div>
  );
};

export default HeartButton;
