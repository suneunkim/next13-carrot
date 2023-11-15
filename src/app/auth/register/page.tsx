"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import React from "react";
import { useForm } from "react-hook-form";

const RegisterPage = () => {
  const {
    register,
    formState: { errors },
  } = useForm();
  return (
    <div>
      <div className="p-10 w-80">
        <Input id="name" type="number" label="이름" register={register} errors={errors} formatPrice />
        <Button label="가입하기" onClick={() => alert("가입완료")} />
      </div>
    </div>
  );
};

export default RegisterPage;
