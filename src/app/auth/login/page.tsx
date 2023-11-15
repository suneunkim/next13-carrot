"use client";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false); // 로딩 시 ui disable로 보여주기
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onVaild: SubmitHandler<FieldValues> = async (formData: any) => {
    setIsLoading(true);
    try {
      const data = signIn("credentials", formData);
      console.log(data);
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
        <h1>로그인</h1>
        <Input
          id="email"
          type="email"
          label="이메일"
          register={register}
          errors={errors}
          disabled={isLoading}
        />
        <Input
          id="password"
          type="password"
          label="비밀번호"
          register={register}
          errors={errors}
        />
        <Button label="로그인 하기" />
        <div>
          <p className="text-gray-500 text-sm text-center p-2">
            아직 회원이 아니신가요?{" "}
            <Link
              className="text-black hover:underline text-sm"
              href="/auth/register"
            >
              회원가입 하러가기
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
