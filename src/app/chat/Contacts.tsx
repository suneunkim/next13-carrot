import React from "react";
import { TUserWithChat } from "./chatClient";
import User from "./User";

interface ContactsProps {
  users: TUserWithChat[];
  currentUser: TUserWithChat;
  setLayout: (layout: boolean) => void;
  setReceiver: (receiver: {
    receiverId: string;
    receiverName: string;
    receiverImage: string;
  }) => void;
}

const Contacts = ({
  users,
  currentUser,
  setLayout,
  setReceiver,
}: ContactsProps) => {
  const filterMessages = (
    userId: string,
    userName: string,
    userIamge: string
  ) => {
    setReceiver({
      receiverId: userId,
      receiverName: userName || "",
      receiverImage: userIamge || "",
    });
  };
  return (
    <div className="w-full overflow-auto border-[1px] h-[calc(100vh_-56px)]">
      <h1 className="m-4 font-bold text-2xl">대화 목록</h1>
      <hr />
      <div className="flex flex-col">
        {users?.length > 0 &&
          users
            .filter((user) => user.id !== currentUser?.id)
            .map((user) => {
              return (
                <div
                  key={user.id}
                  onClick={() => {
                    filterMessages(user.id, user.name!, user.image!);
                    setLayout(true);
                  }}
                >
                  <User user={user} currentUserId={currentUser?.id} />
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default Contacts;
