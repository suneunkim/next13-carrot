import { User } from "@prisma/client";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

interface NavItemProps {
  setNavVisible: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: User | null;
}

const NavItem = ({ currentUser, setNavVisible }: NavItemProps) => {
  const toggleNav = () => {
    setNavVisible((prev) => !prev);
  };

  const handleAuthentication = () => {
    if (currentUser === null) {
      signIn();
    } else {
      signOut();
    }
  };

  const [searchValue, setSearchValue] = useState("");
  const handleChange = (e: any) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <ul className="hidden items-center text-lg space-x-5 md:flex">
          <li>중고거래</li>
          <li>동네생활</li>
          <input
            value={searchValue}
            onChange={handleChange}
            className="w-[16rem] bg-gray-200 text-sm p-2 rounded-md"
            placeholder="물품이나 동네를 검색해보세요"
          />
          <Link href={`/?search=${searchValue}`}>검색</Link>
          <button
            onClick={handleAuthentication}
            className="block border border-gray-200 p-[0.3rem] px-3 text-base rounded-md box-border"
          >
            {currentUser === null ? "로그인" : "로그아웃"}
          </button>
        </ul>
        {/* 반응형 nav 아이콘 */}
        <ul className="flex space-x-5 md:hidden ">
          <li className="md:block">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.5999 10.5C3.5999 6.68926 6.68914 3.60002 10.4999 3.60002C14.3107 3.60002 17.3999 6.68926 17.3999 10.5C17.3999 14.3108 14.3107 17.4 10.4999 17.4C6.68914 17.4 3.5999 14.3108 3.5999 10.5ZM10.4999 2.40002C6.0264 2.40002 2.3999 6.02652 2.3999 10.5C2.3999 14.9735 6.0264 18.6 10.4999 18.6C12.5207 18.6 14.3687 17.86 15.7876 16.6362L20.5756 21.4243C20.81 21.6586 21.1899 21.6586 21.4242 21.4243C21.6585 21.19 21.6585 20.8101 21.4242 20.5758L16.6361 15.7877C17.8599 14.3688 18.5999 12.5208 18.5999 10.5C18.5999 6.02652 14.9734 2.40002 10.4999 2.40002Z"
                fill="#212124"
              ></path>
            </svg>
          </li>
          <li className="md:block">
            <button onClick={toggleNav}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3 5.00002C3 4.66865 3.26863 4.40002 3.6 4.40002H20.4C20.7314 4.40002 21 4.66865 21 5.00002C21 5.3314 20.7314 5.60002 20.4 5.60002H3.6C3.26863 5.60002 3 5.3314 3 5.00002Z"
                  fill="#212124"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3 12C3 11.6687 3.26863 11.4 3.6 11.4H20.4C20.7314 11.4 21 11.6687 21 12C21 12.3314 20.7314 12.6 20.4 12.6H3.6C3.26863 12.6 3 12.3314 3 12Z"
                  fill="#212124"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3 19C3 18.6687 3.26863 18.4 3.6 18.4H20.4C20.7314 18.4 21 18.6687 21 19C21 19.3314 20.7314 19.6 20.4 19.6H3.6C3.26863 19.6 3 19.3314 3 19Z"
                  fill="#212124"
                ></path>
              </svg>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default NavItem;

// 중고거래 동네생활 input(검색) 채팅 내정보
