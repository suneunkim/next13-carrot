"use client";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ImageUpload from "@/components/ImageUpload";
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const ProductUploadPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      latitude: 33.5523,
      longitude: 126.7951,
      imageSrc: "",
      price: "",
    },
  });

  const imageSrc = watch("imageSrc");
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value);
    //onChange로 받은 value를 RHF의 setValue로 넣어준다.
  };

  const onValid: SubmitHandler<FieldValues> = formData => {
    //setIsLoading(true);\
    console.log(formData);
  };

  return (
    <Container>
      <div className="max-w-screen-md mx-auto">
        <form onSubmit={handleSubmit(onValid)} className="flex flex-col gap-8">
          <Heading
            title="내 물건 팔기"
            subtitle={`${
              errors.title ? errors.title.message : "자세히 작성하면 좋습니다."
            }`}
          />
          <ImageUpload
            onChange={value => setCustomValue("imageSrc", value)}
            value={imageSrc}
          />
          <Input
            id="title"
            label="제목"
            disabled={isLoading}
            type="text"
            register={register}
            errors={errors}
            required
          />
          <TextArea
            id="description"
            label="설명"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <Input
            id="price"
            label="가격"
            disabled={isLoading}
            type="number"
            register={register}
            errors={errors}
            required
            formatPrice
          />
          <div
            className="
        grid grid-cols-2 gap-2
        max-h-[50vh]
        overflow-y-auto
        "
          >
            {/* 카테고리 */}
          </div>
          <div>{/* 지도 */}지도</div>
          <Button label="작성 완료" />
        </form>
      </div>
    </Container>
  );
};

export default ProductUploadPage;
