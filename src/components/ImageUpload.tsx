import { on } from "events";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React from "react";
import { TbPhotoPlus } from "react-icons/tb";

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload = ({ onChange, value }: ImageUploadProps) => {
  const handleUpload = (result: any) => {
    onChange(result.info.secure_url);
  };
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={uploadPreset}
      options={{
        maxFiles: 3,
      }}
    >
      {({ open }) => {
        return (
          <div
            className="relative flex flex-col items-center justify-center gap-4 p-52 transition border border-dashed cursor-pointer hover:opacity-70 border-neutral-400 text-neutral-400"
            onClick={() => open?.()}
          >
            <TbPhotoPlus size={50} />
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  fill
                  style={{ objectFit: "cover" }}
                  src={value}
                  alt="image"
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
