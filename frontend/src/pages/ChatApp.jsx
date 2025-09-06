import { useState, useEffect } from "react";
import socket from "../utils/socket";
import ChatWindow from "../components/ChatWindow";
import MessageInput from "../components/MessageInput";

const ChatApp = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, { from: data.from, body: data.msg }]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const handleSend = (msg) => {
    setMessages((prev) => [...prev, { from: msg.from, body: msg.body }]);
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto border rounded-lg shadow-lg">
      <h1 className="text-center font-bold text-xl p-4 border-b border-gray-300 bg-gray-50">
        WhatsApp Chat
      </h1>
      <ChatWindow messages={messages} />
      <MessageInput onSend={handleSend} />
    </div>
  );
};

export default ChatApp;
