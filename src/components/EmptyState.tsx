"use client";
import React from "react";
import Heading from "./Heading";
import Button from "./elements/Button";
import { useRouter } from "next/navigation";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState = ({
  title = "일치하는 게 없습니다.",
  subtitle = "필터를 변경하거나 제거해주세요.",
  showReset,
}: EmptyStateProps) => {
  const router = useRouter();

  return (
    <div className=" h-[40vh] flex flex-col gap-2 justify-center items-center">
      <Heading center title={title} subtitle={subtitle} />

      <div className="mt-5">
        {showReset && (
          <Button
            outline
            label="필터 초기화"
            onClick={() => router.push("/")}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
