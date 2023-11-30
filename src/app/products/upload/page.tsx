"use client";
import Button from "@/components/elements/Button";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ImageUpload from "@/components/ImageUpload";
import Input from "@/components/elements/Input";
import TextArea from "@/components/elements/TextArea";
import { categories } from "@/components/categories/Categories";
import CategoryInput from "@/components/categories/CategoryInput";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const ProductUploadPage = () => {
  const router = useRouter();
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
    loading: () => <div>로딩중...</div>,
  });

  // 현재 위치로 지도를 설정. Map의 center를 수정해준다.
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setValue("latitude", position.coords.latitude);
        setValue("longitude", position.coords.longitude);
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value);
    //onChange로 받은 value를 RHF의 setValue로 넣어준다.
  };

  const onValid: SubmitHandler<FieldValues> = async (formData) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/products", formData);
      router.push(`/products/${response.data.product.id}`);
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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
            onChange={(value) => setCustomValue("imageSrc", value)}
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
            {categories.map((item) => (
              <div key={item.label} className="col-span-1">
                <CategoryInput
                  onClick={(category) => setCustomValue("category", category)}
                  selected={category === item.path}
                  label={item.label}
                  path={item.path}
                />
              </div>
            ))}
          </div>
          <hr />
          <Suspense fallback={<p>로딩중입니다.</p>}>
            <KaKaoMap
              setCustomValue={setCustomValue}
              latitude={latitude}
              longitude={longitude}
            />
          </Suspense>
          <Button label="작성 완료" />
        </form>
      </div>
    </Container>
  );
};

export default ProductUploadPage;
