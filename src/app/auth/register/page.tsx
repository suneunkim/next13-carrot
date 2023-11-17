"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Input from "@/components/Input";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false); // 로딩 시 ui disable로 보여주기
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onVaild: SubmitHandler<FieldValues> = async (formData: any) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post("/api/register", formData);
      router.push("/auth/login");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="grid place-items-center h-[calc(80vh_-_70px)]">
      <form
        className="flex flex-col justify-center gap-4 min-w-[350px]"
        onSubmit={handleSubmit(onVaild)}
      >
        <h1>회원가입</h1>
        <Input
          id="email"
          type="email"
          label="이메일"
          register={register}
          errors={errors}
          disabled={isLoading}
        />
        <Input
          id="name"
          type="text"
          label="닉네임"
          register={register}
          errors={errors}
        />
        <Input
          id="password"
          type="password"
          label="비밀번호"
          register={register}
          errors={errors}
        />
        <Button label="가입하기" />
        <div>
          <p className="text-gray-500 text-sm text-center p-2">
            이미 회원이신가요?{" "}
            <Link
              className="text-black hover:underline text-sm"
              href="/auth/login"
            >
              로그인 하러 가기
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
};

export default RegisterPage;
