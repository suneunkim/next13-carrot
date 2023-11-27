"use client";

import React from "react";

import usePagination from "@lucasmogari/react-pagination";
import PaginationLink from "./PaginationLink";

interface PaginationProps {
  page: number; // url query string 기본값 1
  totalItems: number; // 전체 상품 개수
  perPage: number; // 한 페이지에 보여줄 상품 개수
}

const Pagination = ({ page, totalItems, perPage }: PaginationProps) => {
  const { totalPages, getPageItem } = usePagination({
    totalItems: totalItems,
    page: page,
    itemsPerPage: perPage,
  });

  const firstPage = 1;
  const nextPage = Math.min(page + 1, totalPages);
  const prevPage = Math.max(page - 1, firstPage);

  const arr = new Array(totalPages + 2); // 순환하기 위한 용도. 양끝에 이전, 다음

  return (
    <div className="mt-4">
      {[...arr].map((_, i) => {
        const { page, disabled, current } = getPageItem(i);
        if (page === "previous") {
          return (
            <PaginationLink page={prevPage} disabled={disabled} key={i}>
              이전
            </PaginationLink>
          );
        }
        if (page === "next") {
          return (
            <PaginationLink page={nextPage} disabled={disabled} key={i}>
              다음
            </PaginationLink>
          );
        }

        return (
          <PaginationLink active={current} page={page} key={i}>
            {page}
          </PaginationLink>
        );
      })}
    </div>
  );
};

export default Pagination;
