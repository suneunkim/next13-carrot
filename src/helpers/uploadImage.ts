import axios from "axios";

const uploadImage = async (file: File) => {
  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
  );

  try {
    const response = await axios.post(url, formData);

    return response.data.url;
  } catch (error) {
    alert("사진 전송에 실패했습니다.");
    console.error(error);
  }
};

export default uploadImage;
