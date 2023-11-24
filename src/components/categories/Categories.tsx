"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

export const categories = [
  {
    label: "디지털 기기",
    path: "digital",
    description: "디지털 기기 카테고리입니다.",
  },
  {
    label: "생활 가전",
    path: "appliances",
    description: "생활 가전 카테고리입니다.",
  },
  {
    label: "스포츠",
    path: "sports",
    description: "스포츠 카테고리입니다.",
  },
  {
    label: "가구 · 인테리어",
    path: "interior",
    description: "가구와 인테리어 카테고리입니다.",
  },
  {
    label: "의류 · 잡화",
    path: "clothes",
    description: "의류와 잡화 카테고리입니다.",
  },
  {
    label: "뷰티 · 미용",
    path: "beauty",
    description: "뷰티와 미용 카테고리입니다.",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const selectedCategory = params?.get("category"); // 선택된 것과 같은 카테고리 찾기용
  return (
    <div className="flex flex-wrap items-center justify-center space-x-2 overflow-x-auto">
      {categories.map((category) => (
        <Link
          href={`/?category=${category.path}`}
          key={category.path}
          className={`
          font-medium px-4 py-2 rounded-full bg-neutral-100 border border-neutral-300 cursor-pointer hover:bg-neutral-200 transition mb-3
          ${selectedCategory === category.path && "bg-neutral-200  "}
          `}
        >
          {category.label}
        </Link>
      ))}
    </div>
  );
};

export default Categories;
