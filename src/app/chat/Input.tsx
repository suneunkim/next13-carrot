import axios from "axios";
import React, { FormEvent, useState } from "react";
import { IoImageOutline } from "react-icons/io5";
import { RiSendPlaneLine } from "react-icons/ri";
import { CgClose } from "react-icons/cg";
import useSWRMutation from "swr/mutation";
import previewImage from "@/helpers/previewImage";
import uploadImage from "@/helpers/uploadImage";
interface InputProps {
  receiverId: string;
  currentUserId: string;
}

const sendRequest = (
  url: string,
  {
    arg,
  }: {
    arg: {
      text: string;
      image: string;
      receiverId: string;
      senderId: string;
    };
  }
) => {
  return axios.post(url, arg);
};

const Input = ({ receiverId, currentUserId }: InputProps) => {
  const { trigger } = useSWRMutation("/api/chat", sendRequest);

  const [message, setMessage] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const imageUrl = image ? await uploadImage(image as File) : null;

    if (message || imageUrl) {
      try {
        trigger({
          text: message,
          image: imageUrl,
          receiverId: receiverId,
          senderId: currentUserId,
        });
      } catch (error) {
        console.error(error);
      }

      setMessage("");
      setImage(null);
      setImagePreview(null);
    }
  };
  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex items-center justify-between w-full gap-4 p-2 pl-4 border-[1px] rounded-md shadow-sm"
    >
      {imagePreview && (
        <div className="absolute right-0 w-full overflow-hidden rounded-md bottom-[4.2rem] max-w-[300px] shadow-md">
          <img src={imagePreview} alt="prieview" />
          <span
            onClick={removeImage}
            className="absolute flex items-center justify-center p-2 text-xl bg-gray-800 cursor-pointer top-[0.4rem] right-[0.4rem] rounded-full opacity-60 hover:opacity-100 "
          >
            <CgClose />
          </span>
        </div>
      )}

      <input
        className="w-full text-base outline-none"
        type="text"
        placeholder="메세지를 입력해주세요."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <label id="file" className="text-2xl text-gray-400 cursor-pointer">
        <IoImageOutline />
        <input
          id="file"
          type="file"
          className="hidden"
          multiple={false}
          accept="image/*"
          onChange={(e) => previewImage(e, setImagePreview, setImage)}
        />
      </label>
      <button className="flex items-center justify-center p-2 text-gray-50 bg-orange-400 rounded-lg cursor-pointer hover:bg-orange-500 disabled:opacity-60">
        <RiSendPlaneLine />
      </button>
    </form>
  );
};

export default Input;
