import { User } from "@prisma/client";
import React from "react";
import Avatar from "../Avatar";
import { fromNow } from "@/helpers/dayjs";

interface ProductInfoProps {
  user: User;
  title: string;
  category: {
    label: string;
  };
  createAt: Date;
  price: number;
  description: string;
}

const ProductInfo = ({
  user,
  title,
  category,
  createAt,
  price,
  description,
}: ProductInfoProps) => {
  return (
    <div>
      <div>
        <div className="flex gap-2 items-center text-xl">
          <Avatar src={user?.image} />
          <p>{user?.name}</p>
        </div>
      </div>
      <hr className="my-5" />
      <div className="flex flex-col space-y-3">
        <div className="font-semibold text-xl">{title}</div>
        <div className="text-gray-500 text-sm flex gap-1">
          <span>{category.label}</span>
          <span>·</span>
          <span>{fromNow(createAt)}</span>
        </div>
        <div className="font-medium">{price.toLocaleString("ko-KR")}</div>
        <div>{description}</div>
      </div>
      <hr className="my-5" />
    </div>
  );
};

export default ProductInfo;
