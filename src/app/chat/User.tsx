import React from "react";
import { TUserWithChat } from "./chatClient";
import Avatar from "@/components/Avatar";
import { fromNow } from "@/helpers/dayjs";

interface UserProps {
  user: TUserWithChat;
  currentUserId: string;
}

const User = ({ user, currentUserId }: UserProps) => {
  const messagesWithCurrentUser = user.conversations.find((conversation: any) =>
    conversation.users.find((user: any) => user.id === currentUserId)
  );

  const latestMessage = messagesWithCurrentUser?.messages.slice(-1)[0];
  return (
    <div className="grid grid-cols-[40px_1fr_50px] grid-rows-[40px] gap-3 py-3 px-4 border-b-[1px] cursor-pointer hover:bg-gray-200">
      <div>
        <Avatar src={user.image} />
      </div>
      <div>
        <h3>{user.name} </h3>
        {latestMessage && (
          <div className="overflow-hidden text-xs font-medium text-gray-600 break-words whitespace-pre-wrap">
            {latestMessage.text}
            {latestMessage.image && <div>[이미지]</div>}
          </div>
        )}
      </div>
      <div className="flex justify-end text-xs text-gray-500">
        {latestMessage && <p>{fromNow(latestMessage.createAt)}</p>}
      </div>
    </div>
  );
};

export default User;
