"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import qs from "query-string";
import Link from "next/link";
import { PRODUCT_PER_PAGE } from "@/app/(home)/page";

interface PaginationLinkProps {
  page?: number | string;
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

const PaginationLink = ({
  page,
  active,
  children,
  disabled,
}: PaginationLinkProps) => {
  const params = useSearchParams();
  const limit = PRODUCT_PER_PAGE; // 몇개씩 보여줄지
  const skip = page ? (Number(page) - 1) * limit : 0;

  // page, skip을 추가해서 href로 넘긴다.
  let currentParams = {};

  // 현재 url 쿼리 파라미터를 가져와서 객체로 파싱
  if (params) {
    currentParams = qs.parse(params.toString());
  }

  const updatedParams = {
    ...currentParams,
    page: page,
    skip: skip,
  };

  return (
    <Link
      className={`
    p-2
    ${active ? "font-bold text-orange-400" : "text-gray-500"}
    ${disabled ? "pointer-events-none text-gray-300" : ""}
    `}
      href={{ query: updatedParams }}
    >
      {children}
    </Link>
  );
};

export default PaginationLink;
