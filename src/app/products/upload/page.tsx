"use client";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ImageUpload from "@/components/ImageUpload";
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import categories from "@/components/categories/Categories";
import CategoryInput from "@/components/categories/CategoryInput";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
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
      latitude: 31.5523,
      longitude: 122.7951,
      imageSrc: "",
      price: "",
    },
  });

  const imageSrc = watch("imageSrc");
  const category = watch("category");

  const latitude = watch("latitude");
  const longitude = watch("longitude");

  const KaKaoMap = dynamic(() => import("../../../components/KaKaoMap"), {
    ssr: false,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setValue("latitude", position.coords.latitude);
        setValue("longitude", position.coords.longitude);
      },
      error => {
        console.error(error);
      }
    );
  }, []);

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
        grid grid-cols-3 gap-2
        max-h-[50vh]
        overflow-y-auto
        "
          >
            {categories.map(item => (
              <div key={item.label} className="col-span-1">
                <CategoryInput
                  onClick={category => setCustomValue("category", category)}
                  selected={category === item.path}
                  label={item.label}
                  path={item.path}
                />
              </div>
            ))}
          </div>
          <hr />
          <KaKaoMap
            setCustomValue={setCustomValue}
            latitude={latitude}
            longitude={longitude}
          />
          <Button label="작성 완료" />
        </form>
      </div>
    </Container>
  );
};

export default ProductUploadPage;
