import Link from "next/link";
import React from "react";

interface FloatingButtonProps {
  href: string;
  children: React.ReactNode;
}

const FloatingButton = ({ href, children }: FloatingButtonProps) => {
  return (
    <Link
      className="fixed bottom-5 right-5 w-14 h-14 bg-orange-400 text-white flex justify-center items-center border-transparent rounded-full shadow-lg text-3xl transition hover:bg-orange-300"
      href={href}
    >
      {children}
    </Link>
  );
};

export default FloatingButton;
