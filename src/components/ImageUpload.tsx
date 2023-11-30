import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React, { useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload = ({ onChange, value }: ImageUploadProps) => {
  const [showImages, setShowImages] = useState<string[]>([]);

  const handleUpload = (result: any) => {
    const newImage = result.info.secure_url;
    const newImages = [...showImages, newImage];
    setShowImages(newImages);
    onChange(result.info.secure_url);
    console.log(showImages);
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
          <div>
            {showImages.length > 1 ? (
              ""
            ) : (
              <div
                className="relative flex flex-col items-center justify-center gap-4 p-52 transition border border-dashed cursor-pointer hover:opacity-70 border-neutral-400 text-neutral-400"
                onClick={() => open?.()}
              >
                <TbPhotoPlus size={50} />
                {value && (
                  <div className="absolute inset-0 w-full h-full">
                    <div className="">
                      <Image
                        fill
                        style={{ objectFit: "cover" }}
                        src={value}
                        alt="image"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* <div className="flex justify-around w-full">
              {value &&
                showImages.map((image, i) => (
                  <div key={i} className="">
                    <Image
                      style={{ objectFit: "contain" }}
                      src={image}
                      alt="image"
                      width={250}
                      height={250}
                    />
                  </div>
                ))}
            </div> */}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
