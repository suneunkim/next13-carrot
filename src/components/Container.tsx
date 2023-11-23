import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  home?: boolean;
}
const Container = ({ children, home }: ContainerProps) => {
  return (
    <div
      className={`
      max-w-[2520px] mx-auto px-4 py-6
      xl:px-20
      md:px-10
      sm:px-2
      h-[calc(100vh_-_70px)]
      ${home ? "flex flex-col items-center" : ""}
      `}
    >
      {children}
    </div>
  );
};

export default Container;
