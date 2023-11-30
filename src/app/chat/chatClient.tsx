"use client";
import { Message, User } from "@prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Contacts from "./Contacts";
import Chat from "./Chat";
import Loader from "@/components/elements/Loader";

interface ChatClinetProps {
  currentUser: User | null;
}

export type TUserWithChat = User & {
  conversations: TConversation[];
};

export type TConversation = {
  id: string;
  messages: Message[];
  users: User[];
};

const ChatClient = ({ currentUser }: ChatClinetProps) => {
  const [receiver, setReceiver] = useState({
    receiverId: "",
    receiverName: "",
    receiverImage: "",
  });

  // layout이 true면 채팅창만 보이게하기
  const [layout, setLayout] = useState(false);
  const fecher = (url: string) => axios.get(url).then((res) => res.data);
  const { data: users, error, isLoading } = useSWR(`/api/chat`, fecher);

  const currentUserMessage = users?.find(
    (user: TUserWithChat) => user.email === currentUser?.email
  );
  if (isLoading) return <Loader />;
  if (error) return <p>Error</p>;

  return (
    <main>
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr]">
        <section className={`md:flex ${layout && "hidden"}`}>
          <Contacts
            users={users}
            currentUser={currentUserMessage}
            setLayout={setLayout}
            setReceiver={setReceiver}
          />
        </section>
        <section className={`md:flex ${!layout && "hidden"}`}>
          <Chat
            currentUser={currentUserMessage}
            receiver={receiver}
            setLayout={setLayout}
          />
        </section>
      </div>
    </main>
  );
};

export default ChatClient;
