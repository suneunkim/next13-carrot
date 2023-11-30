import React from "react";
import getCurrentUser from "../\baction/getCurrentUser";
import ChatClient from "./chatClient";

const ChatPage = async () => {
  const currentUser = await getCurrentUser();
  return <ChatClient currentUser={currentUser} />;
};
export default ChatPage;
